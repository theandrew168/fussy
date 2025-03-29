import { JiraIssueContext, JiraIssueContextConfig } from "@/model";
import { Version3Client } from "jira.js";

export class APIJiraIntegration {
	private client: Version3Client;

	constructor(url: string, email: string, apiKey: string) {
		this.client = new Version3Client({
			host: url,
			authentication: {
				basic: {
					email,
					apiToken: apiKey,
				},
			},
		});
	}

	async fetchIssueContext(config: JiraIssueContextConfig): Promise<JiraIssueContext> {
		const issue = await this.client.issues.getIssue({
			issueIdOrKey: config.issueKey,
		});
		return {
			type: "jiraIssue",
			config,
			issueData: "TODO: Fetch Jira ticket data",
		};
	}
}
