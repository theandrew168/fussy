import type { UUID } from "node:crypto";

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
};

/**
 * Entity - always identified by ID but the data could change.
 */
export type JiraIssueSource = {
	id: UUID;
	type: "jiraIssue";
	issueKey: string;
};

export type Source = GitHubPullRequestSource | JiraIssueSource;
