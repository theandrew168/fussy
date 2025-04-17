import type { Feature } from "@/domain/model";
import FeatureSource from "./FeatureSource";

import styles from "./FeatureCard.module.css";

export type Props = {
	feature: Feature;
};

export default function FeatureCard({ feature }: Props) {
	return (
		<article className={styles.featureCard}>
			<header className={styles.header}>
				<h3 className={styles.name}>{feature.name}</h3>
				<p className={styles.createdAt}>{feature.createdAt.toDateString()}</p>
			</header>
			<ul className={styles.sourcesList}>
				{feature.sources.map((source) => (
					<li key={source.id}>
						<FeatureSource source={source} />
					</li>
				))}
			</ul>
			<a href={`/feature/${feature.id}`}>View Documentation</a>
		</article>
	);
}
