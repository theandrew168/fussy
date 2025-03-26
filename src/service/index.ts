import { LLM } from "@/llm";
import type { Context, ContextConfig, Feature, GitHubIntegration, JiraIntegration } from "@/model";
import { createPrompt } from "@/prompt";

class FeatureSummarizer {
	private llm: LLM;
	private githubIntegration: GitHubIntegration;
	private jiraIntegration: JiraIntegration;

	constructor(llm: LLM, githubIntegration: GitHubIntegration, jiraIntegration: JiraIntegration) {
		this.llm = llm;
		this.githubIntegration = githubIntegration;
		this.jiraIntegration = jiraIntegration;
	}

	async fetchContext(config: ContextConfig): Promise<Context> {
		switch (config.type) {
			case "githubPullRequest":
				return this.githubIntegration.fetchPullRequestContext(config);
			case "jiraTicket":
				return this.jiraIntegration.fetchTicketContext(config);
			default:
				throw new Error(`Unknown context config: ${config}`);
		}
	}

	async summarize(feature: Feature): Promise<string> {
		const contexts = await Promise.all(feature.contextConfigs.map(this.fetchContext));
		const prompt = createPrompt(contexts);
		return this.llm.ask(prompt);
	}
}
