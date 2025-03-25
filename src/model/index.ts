/**
 * GitHub Integration: Grant access to repos via GitHub App
 * Jira Integration: Something with Atlassian Forge?
 *
 * GitHub Context: (PR ID) -> Text, comments, commits, etc
 * Jira Context: (Ticket ID) -> Text, comments, etc
 *
 * Feature: Groups a bunch of context together.
 */

import type { UUID } from "crypto";

type Account = {
	id: UUID;
};

type GitHubPullRequestContext = {
	owner: string;
	repo: string;
	pullRequestID: string;
};

type GitHubIntegration = {
	id: UUID;
	getPullRequestContext: (context: GitHubPullRequestContext) => Promise<Context>;
};

type JiraTicketContext = {
	ticketID: string;
};

type JiraIntegration = {
	id: UUID;
	getTicketContext: (context: JiraTicketContext) => Promise<Context>;
};

/**
 * Basic context behavior: render to a prompt-ready string.
 */
type Context = {
	render: () => Promise<string>;
};

/**
 * Super naive version of gathering a bunch of contexts, rendering them,
 * and then forming a cohesive prompt for summarizing, scripting, etc.
 */
async function createPrompt(contexts: Context[]): Promise<string> {
	const prompts = await Promise.all(contexts.map((context) => context.render()));
	return prompts.join("\n\n");
}

/**
 * One account can have many features. Many features can have many contexts.
 */
type Feature = {
	id: UUID;
	name: string;
	contexts: Context[];
};

/**
 * Basic LLM behavior: ask a question, get a response.
 *
 * Implementations:
 * Local ollama
 * Anthropic
 * OpenAI
 * Gemini
 * Generic REST API
 */
type LLM = {
	ask: (prompt: string) => Promise<string>;
};
