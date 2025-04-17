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
	// TODO: Change this to PR ID (pullNumber).
	ref: string;
	createdAt: Date;
	updatedAt: Date;
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
	createdAt: Date;
	updatedAt: Date;
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

export type GitHubIntegration = {
	id: UUID;
	type: "github";
	url: string;
	createdAt: Date;
	updatedAt: Date;

	/**
	 * Get all of the relevant information for a pull request source.
	 */
	fetchPullRequestContext: (source: GitHubPullRequestSource) => Promise<GitHubPullRequestContext>;
};

export type JiraIntegration = {
	id: UUID;
	type: "jira";
	url: string;
	createdAt: Date;
	updatedAt: Date;

	/**
	 * Get all of the relevant information for a Jira issue source.
	 */
	fetchIssueContext: (source: JiraIssueSource) => Promise<JiraIssueContext>;
};

export type Integration = GitHubIntegration | JiraIntegration;

/**
 * One account can have many features.
 * Many features can have many sources.
 */
export type Feature = {
	id: UUID;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	sources: Source[];
};
