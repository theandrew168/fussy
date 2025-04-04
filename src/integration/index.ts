import type {
	GitHubPullRequestContext,
	GitHubPullRequestContextConfig,
	JiraIssueContext,
	JiraIssueContextConfig,
} from "@/model";

export type GitHubIntegration = {
	/**
	 * Get all of the relevant information for this pull request
	 * and format it into a string for LLM prompting.
	 */
	fetchPullRequestContext: (config: GitHubPullRequestContextConfig) => Promise<GitHubPullRequestContext>;
};

export type JiraIntegration = {
	/**
	 * Get all of the relevant information for this ticket
	 * and format it into a string for LLM prompting.
	 */
	fetchIssueContext: (config: JiraIssueContextConfig) => Promise<JiraIssueContext>;
};
