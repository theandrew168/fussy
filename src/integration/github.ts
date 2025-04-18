import path from "node:path";

import { Octokit } from "octokit";

import { readConfigFromEnvironment } from "@/config";
import type { GitHubPullRequestSource } from "@/domain/source";
import type { GitHubFile, GitHubPullRequestContext } from "@/domain/context";

/**
 * Files to be ignored because they are typically secondary to the main
 * dependency changes. Furthermore, they generate a lot of noise in the
 * diff, which makes it hard to see the actual changes.
 */
const IGNORE_FILES = ["package-lock.json", "yarn.lock", "pnpm-lock.yaml"];

export class APIGitHubIntegration {
	private static instance?: APIGitHubIntegration;
	private octokit: Octokit;

	constructor(apiKey: string) {
		this.octokit = new Octokit({ auth: apiKey });
	}

	static getInstance(): APIGitHubIntegration | undefined {
		const config = readConfigFromEnvironment();
		if (!config.github) {
			return undefined;
		}

		if (!this.instance) {
			this.instance = new APIGitHubIntegration(config.github.apiKey);
		}

		return this.instance;
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
