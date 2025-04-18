import { randomUUID } from "node:crypto";

import { readConfigFromEnvironment } from "@/config";
import type { Feature } from "@/domain/model";
import { FeatureSummarizer } from "@/domain/summary";
import { OllamaLLM } from "@/llm/ollama";
import { APIGitHubIntegration } from "@/integration/github";
import { APIJiraIntegration } from "@/integration/jira";

type Params = {
	id: string;
};

export default async function Feature({ params }: { params: Promise<Params> }) {
	const { id } = await params;

	const feature: Feature = {
		id: randomUUID(),
		name: "OAuth 2.0 Authentication",
		createdAt: new Date(),
		updatedAt: new Date(),
		sources: [
			{
				id: randomUUID(),
				type: "githubPullRequest",
				owner: "theandrew168",
				repo: "fussy",
				ref: "e4e2dc842022c35f7fe27a45effd1dc2602a23b6",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: randomUUID(),
				type: "jiraIssue",
				issueKey: "SCRUM-1",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
	};

	const config = readConfigFromEnvironment();

	// TODO: Move these to a shared / closured location.
	const llm = new OllamaLLM();

	let githubIntegration: APIGitHubIntegration | undefined;
	if (config.github?.apiKey) {
		githubIntegration = new APIGitHubIntegration(config.github.apiKey);
	}

	let jiraIntegration: APIJiraIntegration | undefined;
	if (config.jira) {
		jiraIntegration = new APIJiraIntegration(config.jira.url, config.jira.email, config.jira.apiKey);
	}

	const featureSummarizer = new FeatureSummarizer(llm, githubIntegration, jiraIntegration);

	const summary = await featureSummarizer.summarize(feature);

	return (
		<div className="container">
			<h1>Feature</h1>
			<p>ID: {id}</p>
			<p>Name: {feature.name}</p>
			<p>Summary: {summary}</p>
		</div>
	);
}
