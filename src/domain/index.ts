import type { UUID } from "node:crypto";

/**
 * GitHub Integration: Grant access to repos via GitHub App
 * Jira Integration: Something with Atlassian Forge?
 *
 * GitHub Context: (PR ID) -> Text, comments, commits, etc
 * Jira Context: (Ticket ID) -> Text, comments, etc
 *
 * Feature: Groups a bunch of context together.
 *
 * Context has a couple meanings:
 * 1. A reference to some information _somewhere_ like a PR or ticket (config).
 * 2. A piece of information that has been gathered and is ready to be rendered (actual info).
 *
 * Exmaple:
 * I have a feature called "update user agent".
 * It has a GitHub context for PR 1234.
 * It has a Jira context for ticket 5678.
 */

/**
 * Entity.
 * Has many integrations.
 * Has many features.
 */
export type Account = {
	id: UUID;
};

/**
 * Entity - always identified by ID but the data could change.
 */
export type GitHubPullRequestSource = {
	id: UUID;
	type: "githubPullRequest";
	owner: string;
	repo: string;
	// TODO: Change this to PR ID.
	ref: string;
};

/**
 * A file that has been changed in a commit (obtained via the GitHub API).
 * TODO: Get this type from the Octokit library.
 */
export type GitHubFile = {
	filename: string;
	patch: string;
};

/**
 * Value Object - derived from a GitHub pull request source.
 */
export type GitHubPullRequestContext = {
	type: "githubPullRequest";
	source: GitHubPullRequestSource;
	files: GitHubFile[];
};

/**
 * Entity - always identified by ID but the data could change.
 */
export type JiraIssueSource = {
	id: UUID;
	type: "jiraIssue";
	issueKey: string;
};

/**
 * Value Object - derived from a Jira issue source.
 */
export type JiraIssueContext = {
	type: "jiraIssue";
	source: JiraIssueSource;
	description: string;
	comments: string[];
};

export type Source = GitHubPullRequestSource | JiraIssueSource;

export type Context = GitHubPullRequestContext | JiraIssueContext;

/**
 * One account can have many features.
 * Many features can have many sources.
 */
export type Feature = {
	id: UUID;
	name: string;
	sources: Source[];
};

export type GitHubIntegration = {
	url: string;

	/**
	 * Get all of the relevant information for a pull request source.
	 */
	fetchPullRequestContext: (source: GitHubPullRequestSource) => Promise<GitHubPullRequestContext>;
};

export type JiraIntegration = {
	url: string;

	/**
	 * Get all of the relevant information for a Jira issue source.
	 */
	fetchIssueContext: (source: JiraIssueSource) => Promise<JiraIssueContext>;
};

function renderGitHubPullRequestContext(context: GitHubPullRequestContext): string {
	// Split each file into a string highlighting the filename and patch.
	function renderFile(file: GitHubFile): string {
		return `${file.filename}\n${file.patch}`;
	}

	const { files } = context;
	const renderedFiles = files.map(renderFile);
	return renderedFiles.join("\n\n");
}

function renderJiraTicketContext(context: JiraIssueContext): string {
	const comments = context.comments.join("\n\n");
	return `${context.description}\n\n${comments}`;
}

function renderContext(context: Context): string {
	switch (context.type) {
		case "githubPullRequest":
			return renderGitHubPullRequestContext(context);
		case "jiraIssue":
			return renderJiraTicketContext(context);
		default:
			throw new Error(`Unknown context: ${context}`);
	}
}

export function createPrompt(contexts: Context[]): string {
	const renderedContexts = contexts.map(renderContext);
	const joinedContexts = renderedContexts.join("\n\n");
	return `Please summarize the following information (which may include Git patches and Jira issues):\n\n${joinedContexts}`;
}

/**
 * Basic LLM behavior: ask a question, get a response.
 *
 * Implementations:
 * Local ollama
 * Anthropic
 * OpenAI
 * Gemini
 * Generic REST API
 */
export type LLM = {
	ask: (prompt: string) => Promise<string>;
};

export class FeatureSummarizer {
	private llm: LLM;
	private githubIntegration: GitHubIntegration;
	private jiraIntegration: JiraIntegration;

	constructor(llm: LLM, githubIntegration: GitHubIntegration, jiraIntegration: JiraIntegration) {
		this.llm = llm;
		this.githubIntegration = githubIntegration;
		this.jiraIntegration = jiraIntegration;
	}

	async fetchContext(config: Source): Promise<Context> {
		switch (config.type) {
			case "githubPullRequest":
				return this.githubIntegration.fetchPullRequestContext(config);
			case "jiraIssue":
				return this.jiraIntegration.fetchIssueContext(config);
			default:
				throw new Error(`Unknown context config: ${config}`);
		}
	}

	async summarize(feature: Feature): Promise<string> {
		const contexts = await Promise.all(feature.sources.map((config) => this.fetchContext(config)));
		const prompt = createPrompt(contexts);
		return this.llm.ask(prompt);
	}
}

export type IntegrationRepository = {};

export type FeatureRepository = {
	create: (feature: Feature) => Promise<void>;
	list: () => Promise<Feature[]>;
	read: (id: UUID) => Promise<Feature>;
	update: (feature: Feature) => Promise<void>;
	delete: (id: UUID) => Promise<void>;

	addContextConfig: (featureID: UUID, config: Source) => Promise<void>;
	removeContextConfig: (featureID: UUID, configID: UUID) => Promise<void>;
};
