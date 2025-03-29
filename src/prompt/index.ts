import { Context, GitHubFile, GitHubPullRequestContext, JiraIssueContext } from "@/model";

function renderGitHubPullRequestContext(context: GitHubPullRequestContext): string {
	// Split each file into a string highlighting the filename and patch.
	function renderFile(file: GitHubFile): string {
		return `File: ${file.filename}\nPatch:\n${file.patch}`;
	}

	const { files } = context;
	const renderedFiles = files.map(renderFile);
	const joinedFiles = renderedFiles.join("\n\n");

	return `Summarize these code changes. Include the file names and a brief description of the changes made. Format the summary using plain text.\n\n${joinedFiles}`;
}

function renderJiraTicketContext(context: JiraIssueContext): string {
	return `Jira Ticket: ${context.issueData}`;
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
	return `Please summarize the following information:\n\n${joinedContexts}`;
}
