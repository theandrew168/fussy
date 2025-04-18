import type { GitHubPullRequestContext, JiraIssueContext } from "./context";
import type { GitHubPullRequestSource, JiraIssueSource } from "./source";

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
