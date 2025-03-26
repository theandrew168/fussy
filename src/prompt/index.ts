import type { Context } from "@/model";

function renderContext(context: Context): string {
	switch (context.type) {
		case "githubPullRequest":
			return `GitHub Pull Request:\n${context.pullRequestData}`;
		case "jiraTicket":
			return `Jira Ticket:\n${context.ticketData}`;
		default:
			throw new Error(`Unknown context: ${context}`);
	}
}

export function createPrompt(contexts: Context[]): string {
	const renderedContexts = contexts.map(renderContext);
	const joinedContexts = renderedContexts.join("\n\n");
	return `Please summarize the following information:\n\n${joinedContexts}`;
}
