import { randomUUID } from "node:crypto";

import { siGithub, siJira, siTrello } from "simple-icons";

import type { Feature } from "@/domain/model";
import IntegrationCard from "@/ui/IntegrationCard";
import FeatureCard from "@/ui/FeatureCard";
import type { IntegrationOverview } from "@/ui/types";

import styles from "./page.module.css";

// Actual existing features.
const features: Feature[] = [
	{
		id: randomUUID(),
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
	},
	{
		id: randomUUID(),
		name: "Dashboard Analytics Widgets",
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
	},
	{
		id: randomUUID(),
		name: "User Profile Management",
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
	},
	{
		id: randomUUID(),
		name: "API Rate Limiting",
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
	},
	{
		id: randomUUID(),
		name: "Notification System",
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
	},
	{
		id: randomUUID(),
		name: "Dark Mode Support",
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
	},
];

// Potential integrations (connected if already connected).
const integrations: IntegrationOverview[] = [
	{
		name: "GitHub",
		icon: siGithub,
		description: "Connect to GitHub to track pull requests and code changes.",
		features: ["Simple integration process", "Pull request summaries", "Analyze commits and comments"],
	},
	{
		name: "Jira",
		icon: siJira,
		description: "Connect to Jira to track issues and link them to code changes.",
		features: [
			"Simple integration process",
			"Epic, story, and issue tracking",
			"Analyze comments, status, and history",
		],
	},
	{
		name: "Trello",
		icon: siTrello,
		description: "Connect to Jira to track cards and link them to code changes.",
		features: ["Simple integration process", "Board and card tracking", "Analyze descriptions and comments"],
	},
];

export default async function Dashboard() {
	return (
		<>
			<section>
				<h1>Dashboard</h1>
			</section>
			<section>
				<h2 className={styles.featuresHeader}>Features Being Documented</h2>
				<ul className={styles.featuresList}>
					{features.map((feature) => (
						<li key={feature.id}>
							<FeatureCard feature={feature} />
						</li>
					))}
				</ul>
			</section>
			<section>
				<h2 className={styles.integrationsHeader}>Connected Integrations</h2>
				<ul className={styles.integrationsList}>
					{integrations.map((integration) => (
						<li key={integration.name}>
							<IntegrationCard integration={integration} />
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
