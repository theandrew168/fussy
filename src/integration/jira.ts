import { randomUUID, type UUID } from "node:crypto";

import { Version3Client } from "jira.js";
import type { Document, Issue } from "jira.js/out/version3/models";

import type { JiraIssueContext, JiraIssueSource } from "@/domain/model";

type DocumentWithoutVersion = Omit<Document, "version">;

function renderDocument(document?: DocumentWithoutVersion): string[] {
	if (!document) {
		return [];
	}

	// Recursively flatten any non-text documents.
	if (document.type !== "text" && document.content) {
		return document.content.flatMap(renderDocument);
	}

	if (!document.text) {
		return [];
	}

	const links = document.marks?.filter((mark) => mark.type === "link") ?? [];
	if (links.length) {
		const hrefs = links.map((link) => link.attrs?.href).filter((href) => href);
		const text = `${document.text} (${hrefs.join(", ")})`;
		return [text];
	}

	return [document.text];
}

function renderIssueDescription(issue: Issue): string {
	return renderDocument(issue.fields.description).join(" ");
}

function renderIssueComments(issue: Issue): string[] {
	const comments = issue.fields.comment.comments;
	return comments.map((comment) => renderDocument(comment.body).join(" "));
}

export class APIJiraIntegration {
	private client: Version3Client;

	type = "jira" as const;
	id: UUID = randomUUID();
	url: string = "TODO";
	createdAt = new Date();
	updatedAt = new Date();

	constructor(url: string, email: string, apiKey: string) {
		this.client = new Version3Client({
			host: url,
			authentication: {
				basic: {
					email,
					apiToken: apiKey,
				},
			},
		});
	}

	async fetchIssueContext(source: JiraIssueSource): Promise<JiraIssueContext> {
		const issue = await this.client.issues.getIssue({
			issueIdOrKey: source.issueKey,
		});
		return {
			type: "jiraIssue",
			source,
			description: renderIssueDescription(issue),
			comments: renderIssueComments(issue),
		};
	}
}
