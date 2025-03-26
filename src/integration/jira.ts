import { JiraTicketContext, JiraTicketContextConfig } from "@/model";

export class APIJiraIntegration {
	async fetchTicketContext(config: JiraTicketContextConfig): Promise<JiraTicketContext> {
		return {
			type: "jiraTicket",
			config,
			ticketData: "TODO: Fetch Jira ticket data",
		};
	}
}
