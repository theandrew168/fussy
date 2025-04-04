import Link from "next/link";

import type { Feature } from "@/model";
import { randomUUID } from "node:crypto";

export default async function Dashboard() {
	const features: Feature[] = [
		{
			id: randomUUID(),
			name: "OAuth 2.0 Authentication",
			contextConfigs: [
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
		},
	];

	const integrations = [
		{
			name: "GitHub",
			description: "GitHub integration",
		},
		{
			name: "Jira",
			description: "Jira integration",
		},
	];

	return (
		<div className="container">
			<section>
				<h1>Dashboard</h1>
			</section>
			<section>
				<h2>Features Being Documented</h2>
				{features.map((feature) => (
					<div key={feature.id}>
						<h3>
							<Link href={`/features/${feature.id}`}>{feature.name}</Link>
						</h3>
						<p>CCs: {feature.contextConfigs.map((config) => config.type).join(", ")}</p>
					</div>
				))}
			</section>
			<section>
				<h2>Connected Integrations</h2>
				{integrations.map((integration) => (
					<div key={integration.name}>
						<h3>{integration.name}</h3>
						<p>{integration.description}</p>
					</div>
				))}
			</section>
		</div>
	);
}
