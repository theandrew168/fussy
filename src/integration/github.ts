import { Octokit } from "octokit";

import { GitHubFile, GitHubPullRequestContext, GitHubPullRequestContextConfig } from "@/model";

export class APIGitHubIntegration {
	private octokit: Octokit;

	constructor(apiKey: string) {
		this.octokit = new Octokit({ auth: apiKey });
	}

	async fetchPullRequestContext(config: GitHubPullRequestContextConfig): Promise<GitHubPullRequestContext> {
		const { owner, repo, ref } = config;
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
			config,
			files,
		};
	}
}
