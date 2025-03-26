import { GitHubIntegration, JiraIntegration } from "@/integration";
import { LLM } from "@/llm";
import { Context, ContextConfig, Feature } from "@/model";
import { createPrompt } from "@/prompt";

export class FeatureSummarizer {
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
		const contexts = await Promise.all(feature.contextConfigs.map((config) => this.fetchContext(config)));
		const prompt = createPrompt(contexts);
		return this.llm.ask(prompt);
	}
}
