import { randomUUID, type UUID } from "node:crypto";
import path from "node:path";

import { Octokit } from "octokit";

import type { GitHubFile, GitHubPullRequestContext, GitHubPullRequestSource } from "@/domain/model";

/**
 * Files to be ignored because they are typically secondary to the main
 * dependency changes. Furthermore, they generate a lot of noise in the
 * diff, which makes it hard to see the actual changes.
 */
const IGNORE_FILES = ["package-lock.json", "yarn.lock", "pnpm-lock.yaml"];

export class APIGitHubIntegration {
	private octokit: Octokit;

	type = "github" as const;
	id: UUID = randomUUID();
	url: string = "TODO";
	createdAt = new Date();
	updatedAt = new Date();

	constructor(apiKey: string) {
		this.octokit = new Octokit({ auth: apiKey });
	}

	async fetchPullRequestContext(source: GitHubPullRequestSource): Promise<GitHubPullRequestContext> {
		const { owner, repo, ref } = source;
		// TODO: Fetch actual PRs instead of individual commits.
		const resp = await this.octokit.rest.repos.getCommit({
			owner,
			repo,
			ref,
		});
		const commit = resp.data;

		// Skip files without patches.
		const files: GitHubFile[] = [];
		for (const file of commit.files ?? []) {
			const basename = path.basename(file.filename);
			if (IGNORE_FILES.includes(basename)) {
				continue;
			}

			if (!file.patch) {
				continue;
			}

			files.push({
				filename: file.filename,
				patch: file.patch,
			});
		}

		return {
			type: "githubPullRequest",
			source,
			files,
		};
	}
}
