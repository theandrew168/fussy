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

import type { UUID } from "crypto";

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
	type: 'githubPullRequest';
	id: UUID;
	owner: string;
	repo: string;
	pullRequestID: string;
};

export type GitHubPullRequestContext = {
	type: 'githubPullRequest';
	// TODO: actual metadata
	pullRequestData: string;
	config: GitHubPullRequestContextConfig;
}

/**
 * Entity? Does this even need to be persisted?
 */
export type GitHubIntegration = {
	id: UUID;
	/**
	 * Get all of the relevant information for this pull request
	 * and format it into a string for LLM prompting.
	 */
	fetchPullRequestContext: (config: GitHubPullRequestContextConfig) => Promise<GitHubPullRequestContext>;
};

/**
 * Entity - always identified by ID but the data could change.
 */
export type JiraTicketContextConfig = {
	type: 'jiraTicket';
	id: UUID;
	ticketID: string;
};

export type JiraTicketContext = {
	type: 'jiraTicket';
	// TODO: actual metadata
	ticketData: string;
	config: JiraTicketContextConfig;
}

/**
 * Entity. Does this even need to be persisted?
 */
export type JiraIntegration = {
	id: UUID;
	/**
	 * Get all of the relevant information for this ticket
	 * and format it into a string for LLM prompting.
	 */
	fetchTicketContext: (config: JiraTicketContextConfig) => Promise<JiraTicketContext>;
};

export type ContextConfig = GitHubPullRequestContextConfig | JiraTicketContextConfig;

export type Context = GitHubPullRequestContext | JiraTicketContext;

/**
 * One account can have many features.
 * Many features can have many contexts.
 */
export type Feature = {
	id: UUID;
	name: string;
	contextConfigs: ContextConfig[];
};
