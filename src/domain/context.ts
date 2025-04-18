import type { GitHubPullRequestSource, JiraIssueSource } from "./source";

/**
 * A file that has been changed in a commit (obtained via the GitHub API).
 * TODO: Get this type from the Octokit library.
 */
export type GitHubFile = {
	filename: string;
	patch: string;
};

/**
 * Value Object - derived from a GitHub pull request source.
 */
export type GitHubPullRequestContext = {
	type: "githubPullRequest";
	source: GitHubPullRequestSource;
	files: GitHubFile[];
};

/**
 * Value Object - derived from a Jira issue source.
 */
export type JiraIssueContext = {
	type: "jiraIssue";
	source: JiraIssueSource;
	description: string;
	comments: string[];
};

export type Context = GitHubPullRequestContext | JiraIssueContext;
