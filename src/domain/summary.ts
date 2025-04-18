import type { LLM } from "./llm";
import type { Context, Feature, GitHubIntegration, JiraIntegration, Source } from "./model";
import { createPrompt } from "./prompt";

export class FeatureSummarizer {
	private llm: LLM;
	private githubIntegration?: GitHubIntegration;
	private jiraIntegration?: JiraIntegration;

	constructor(llm: LLM, githubIntegration?: GitHubIntegration, jiraIntegration?: JiraIntegration) {
		this.llm = llm;
		this.githubIntegration = githubIntegration;
		this.jiraIntegration = jiraIntegration;
	}

	async fetchContext(config: Source): Promise<Context> {
		switch (config.type) {
			case "githubPullRequest":
				if (!this.githubIntegration) {
					throw new Error("GitHub integration is not configured.");
				}
				return this.githubIntegration.fetchPullRequestContext(config);
			case "jiraIssue":
				if (!this.jiraIntegration) {
					throw new Error("Jira integration is not configured.");
				}
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
