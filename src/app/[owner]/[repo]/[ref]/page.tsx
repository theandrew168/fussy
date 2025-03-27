import { randomUUID } from "crypto";

import { APIGitHubIntegration } from "@/integration/github";
import { APIJiraIntegration } from "@/integration/jira";
// import { AnthropicLLM } from "@/llm/anthropic";
import { OllamaLLM } from "@/llm/ollama";
import { Feature } from "@/model";
import { FeatureSummarizer } from "@/service";
import styles from "./page.module.css";

type Params = {
	owner: string;
	repo: string;
	ref: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
	const { owner, repo, ref } = await params;

	const feature: Feature = {
		id: randomUUID(),
		name: "Awesome DDD Feature",
		contextConfigs: [
			{
				id: randomUUID(),
				type: "githubPullRequest",
				owner,
				repo,
				ref,
			},
		],
	};

	// TODO: Ensure this is present at startup.
	const anthropicAPIKey = process.env["ANTHROPIC_API_KEY"];
	if (!anthropicAPIKey) {
		throw new Error("ANTHROPIC_API_KEY is required.");
	}

	// TODO: Ensure this is present at startup.
	const githubAPIKey = process.env["GITHUB_API_KEY"];
	if (!githubAPIKey) {
		throw new Error("GITHUB_API_KEY is required.");
	}

	// TODO: Move these to a shared / closured location.
	// const llm = new AnthropicLLM(anthropicAPIKey);
	const llm = new OllamaLLM();
	const githubIntegration = new APIGitHubIntegration(githubAPIKey);
	const jiraIntegration = new APIJiraIntegration();
	const featureSummarizer = new FeatureSummarizer(llm, githubIntegration, jiraIntegration);

	const summary = await featureSummarizer.summarize(feature);

	return (
		<div className={styles.page}>
			<h1>Summary</h1>
			<p>{summary}</p>
		</div>
	);
}
