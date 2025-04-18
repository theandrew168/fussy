import type { ReactElement } from "react";
import { siGithub, siJira } from "simple-icons";

import type { Source } from "@/domain/source";
import Icon from "./Icon";

import styles from "./FeatureSource.module.css";

export type Props = {
	source: Source;
};

export default function FeatureSource({ source }: Props) {
	let icon: ReactElement | null = null;
	let text: string | null = null;

	switch (source.type) {
		case "githubPullRequest":
			icon = <Icon title={siGithub.title} path={siGithub.path} size={12} />;
			text = `${source.owner}/${source.repo}`;
			break;
		case "jiraIssue":
			icon = <Icon title={siJira.title} path={siJira.path} size={12} />;
			text = source.issueKey;
			break;
		default:
			break;
	}

	return (
		<span className={styles.featureSource}>
			{icon}
			<span>{text}</span>
		</span>
	);
}
