/**
 * GitHub Integration: Grant access to repos via GitHub App
 * Jira Integration: Something with Atlassian Forge?
 *
 * GitHub Context: (PR ID) -> Text, comments, commits, etc
 * Jira Context: (Ticket ID) -> Text, comments, etc
 *
 * Feature: Groups a bunch of context together.
 *
 * Context has a couple meanings:
 * 1. A reference to some information _somewhere_ like a PR or ticket (config).
 * 2. A piece of information that has been gathered and is ready to be rendered (actual info).
 *
 * Exmaple:
 * I have a feature called "update user agent".
 * It has a GitHub context for PR 1234.
 * It has a Jira context for ticket 5678.
 */

import { UUID } from "crypto";

/**
 * Entity.
 * Has many integrations.
 * Has many features.
 */
export type Account = {
	id: UUID;
};

/**
 * Entity - always identified by ID but the data could change.
 */
export type GitHubPullRequestContextConfig = {
	id: UUID;
	type: "githubPullRequest";
	owner: string;
	repo: string;
	// TODO: Change this to PR ID.
	ref: string;
};

/**
 * A file that has been changed in a commit (obtained via the GitHub API).
 * TODO: Get this type from the Octokit library.
 */
export type GitHubFile = {
	filename: string;
	patch: string;
};

export type GitHubPullRequestContext = {
	type: "githubPullRequest";
	config: GitHubPullRequestContextConfig;
	files: GitHubFile[];
};

/**
 * Entity - always identified by ID but the data could change.
 */
export type JiraIssueContextConfig = {
	id: UUID;
	type: "jiraIssue";
	issueKey: string;
};

export type JiraIssueContext = {
	type: "jiraIssue";
	config: JiraIssueContextConfig;
	description: string;
	comments: string[];
};

export type ContextConfig = GitHubPullRequestContextConfig | JiraIssueContextConfig;

export type Context = GitHubPullRequestContext | JiraIssueContext;

/**
 * One account can have many features.
 * Many features can have many contexts.
 */
export type Feature = {
	id: UUID;
	name: string;
	contextConfigs: ContextConfig[];
};
