import type { Context, GitHubFile, GitHubPullRequestContext, JiraIssueContext } from "./context";

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
