import type { GitHubIntegration, JiraIntegration } from "./integration";
import type { LLM } from "./llm";
import { createPrompt } from "./prompt";
import type { Source } from "./source";
import type { Feature } from "./feature";
import type { Context } from "./context";

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
