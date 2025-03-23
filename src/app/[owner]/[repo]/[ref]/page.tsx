import Anthropic from "@anthropic-ai/sdk";
import { Octokit } from "octokit";

import styles from "./page.module.css";

// References:
// https://hono.dev/docs/getting-started/basic
// https://github.com/octokit/octokit.js
// https://github.com/anthropics/anthropic-sdk-typescript

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
	return `${changes}\n\nSummarize these code changes. Include the file names and a brief description of the changes made. Format the summary using plain text.`;
}

function formatAudioScriptPrompt(files: File[]): string {
	const changes = formatChanges(files);
	return `${changes}\n\nSummarize these code changes and generate an audio script to be used for making a video to summarize the changes. Use a friendly and professional tone. Format the script using plain text.`;
}

const client = new Anthropic({
	apiKey: process.env["ANTHROPIC_API_KEY"],
});

const octokit = new Octokit({
	auth: process.env["GITHUB_API_KEY"],
});

type Params = {
	owner: string;
	repo: string;
	ref: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
	const { owner, repo, ref } = await params;

	const commit = await fetchCommit(octokit, owner, repo, ref);
	const prompt = formatAudioScriptPrompt(commit.files ?? []);
	const message = await client.messages.create({
		max_tokens: 1024,
		messages: [{ role: "user", content: prompt }],
		model: "claude-3-7-sonnet-latest",
	});
	const summary = message.content[0].type === "text" ? message.content[0].text : "Invalid response.";

	return (
		<div className={styles.page}>
			<h1>Summary</h1>
			<p>{summary}</p>
		</div>
	);
}
