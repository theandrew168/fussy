import Anthropic from "@anthropic-ai/sdk";
import { Hono } from "hono";
import { Octokit } from "octokit";

/**
 * Fetch a commit from a GitHub repository.
 */
async function fetchCommit(octokit: Octokit, owner: string, repo: string, ref: string) {
	const resp = await octokit.rest.repos.getCommit({
		owner,
		repo,
		ref,
	});
	return resp.data;
}

/**
 * A file that has been changed in a commit (obtained via the GitHub API).
 */
type File = {
	filename: string;
	patch?: string;
};

function formatChange(file: File): string {
	return `File: ${file.filename}\nPatch:\n${file.patch ?? "No changes"}`;
}

function formatChanges(files: File[]): string {
	const changes = files.map(formatChange);
	return changes.join("\n\n");
}

function formatSummaryPrompt(files: File[]): string {
	const changes = formatChanges(files);
	return `${changes}\n\nSummarize these code changes. Include the file names and a brief description of the changes made. Format the summary using semantic HTML.`;
}

function formatAudioScriptPrompt(files: File[]): string {
	const changes = formatChanges(files);
	return `${changes}\n\nSummarize these code changes and generate an audio script to be used for making a video to summarize the changes. Use a friendly and professional tone. Format the script using semantic HTML.`;
}

const client = new Anthropic({
	apiKey: process.env["ANTHROPIC_API_KEY"],
});

const octokit = new Octokit({
	auth: process.env["GITHUB_API_KEY"],
});

const app = new Hono();

// Debugging endpoint to test Hono.
app.get("/", (c) => {
	return c.text("Hello Node.js!\n");
});

// Debugging endpoint to test the GitHub API.
app.get("/gh", async (c) => {
	const resp = await octokit.rest.repos.get({
		owner: "honojs",
		repo: "hono",
	});
	return c.json(resp.data);
});

// Debugging endpoint to test the GitHub API.
app.get("/gh/:owner/:repo/:ref", async (c) => {
	const owner = c.req.param("owner");
	const repo = c.req.param("repo");
	const ref = c.req.param("ref");
	const commit = await fetchCommit(octokit, owner, repo, ref);
	return c.json(commit);
});

// Debugging endpoint to test the AI model.
app.get("/ai", async (c) => {
	const message = await client.messages.create({
		max_tokens: 1024,
		messages: [{ role: "user", content: "Hello, Claude" }],
		model: "claude-3-7-sonnet-latest",
	});
	return c.json(message);
});

// Show the prompt used to summarize the changes in a commit.
app.get("/prompt/:owner/:repo/:ref", async (c) => {
	const owner = c.req.param("owner");
	const repo = c.req.param("repo");
	const ref = c.req.param("ref");
	const commit = await fetchCommit(octokit, owner, repo, ref);
	const prompt = formatSummaryPrompt(commit.files ?? []);
	return c.text(prompt);
});

// Summarize a commit.
app.get("/summary/:owner/:repo/:ref", async (c) => {
	const owner = c.req.param("owner");
	const repo = c.req.param("repo");
	const ref = c.req.param("ref");
	const commit = await fetchCommit(octokit, owner, repo, ref);
	const prompt = formatSummaryPrompt(commit.files ?? []);
	const message = await client.messages.create({
		max_tokens: 1024,
		messages: [{ role: "user", content: prompt }],
		model: "claude-3-7-sonnet-latest",
	});
	const summary = message.content[0].type === "text" ? message.content[0].text : "Invalid response.";
	return c.html(summary);
});

// Summarize a commit and generate an audio script for a video.
app.get("/script/:owner/:repo/:ref", async (c) => {
	const owner = c.req.param("owner");
	const repo = c.req.param("repo");
	const ref = c.req.param("ref");
	const commit = await fetchCommit(octokit, owner, repo, ref);
	const prompt = formatAudioScriptPrompt(commit.files ?? []);
	const message = await client.messages.create({
		max_tokens: 1024,
		messages: [{ role: "user", content: prompt }],
		model: "claude-3-7-sonnet-latest",
	});
	const script = message.content[0].type === "text" ? message.content[0].text : "Invalid response.";
	return c.html(script);
});

export default app;
