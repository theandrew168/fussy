import { randomUUID } from "node:crypto";

import { readConfigFromEnvironment } from "@/config";
import { APIGitHubIntegration } from "@/integration/github";
import { APIJiraIntegration } from "@/integration/jira";
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
			{
				id: randomUUID(),
				type: "jiraIssue",
				issueKey: "SCRUM-1",
			},
		],
	};

	const config = readConfigFromEnvironment();

	// TODO: Move these to a shared / closured location.
	const llm = new OllamaLLM();
	const githubIntegration = new APIGitHubIntegration(config.githubAPIKey);
	const jiraIntegration = new APIJiraIntegration(config.jiraURL, config.jiraEmail, config.jiraAPIKey);
	const featureSummarizer = new FeatureSummarizer(llm, githubIntegration, jiraIntegration);

	const summary = await featureSummarizer.summarize(feature);

	return (
		<div className={styles.page}>
			<h1>Summary</h1>
			<p>{summary}</p>
		</div>
	);
}
