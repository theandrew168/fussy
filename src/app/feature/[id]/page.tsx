import { randomUUID, type UUID } from "node:crypto";

import type { Feature } from "@/domain/feature";
import { FeatureSummarizer } from "@/domain/summary";
import { OllamaLLM } from "@/llm/ollama";
import { APIGitHubIntegration } from "@/integration/github";
import { APIJiraIntegration } from "@/integration/jira";
import { MemoryFeatureRepository } from "@/repository/memory";
import { notFound } from "next/navigation";

type Params = {
	id: UUID;
};

export default async function Feature({ params }: { params: Promise<Params> }) {
	const { id } = await params;

	// Seed the repository with a feature for demonstration purposes.
	await MemoryFeatureRepository.getInstance().create({
		id: "698e8a93-30e0-46fe-8fc8-825adf1dd8d7",
		name: "Ollama LLM Implementation",
		createdAt: new Date(),
		updatedAt: new Date(),
		sources: [
			{
				id: randomUUID(),
				type: "githubPullRequest",
				owner: "theandrew168",
				repo: "fussy",
				ref: "e4e2dc842022c35f7fe27a45effd1dc2602a23b6",
			},
			{
				id: randomUUID(),
				type: "jiraIssue",
				issueKey: "SCRUM-1",
			},
		],
	});

	const feature = await MemoryFeatureRepository.getInstance().read(id);
	if (!feature) {
		notFound();
	}

	const llm = OllamaLLM.getInstance();
	const githubIntegration = APIGitHubIntegration.getInstance();
	const jiraIntegration = APIJiraIntegration.getInstance();

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
