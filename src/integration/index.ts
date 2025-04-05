import type { GitHubPullRequestContext, GitHubPullRequestSource, JiraIssueContext, JiraIssueSource } from "@/model";

export type GitHubIntegration = {
	/**
	 * Get all of the relevant information for a pull request source.
	 */
	fetchPullRequestContext: (source: GitHubPullRequestSource) => Promise<GitHubPullRequestContext>;
};

export type JiraIntegration = {
	/**
	 * Get all of the relevant information for a Jira issue source.
	 */
	fetchIssueContext: (source: JiraIssueSource) => Promise<JiraIssueContext>;
};
