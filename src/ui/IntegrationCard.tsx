import type { IntegrationOverview } from "./types";
import Icon from "./Icon";

import styles from "./IntegrationCard.module.css";
import { siCheckmarx } from "simple-icons";
import LinkButton from "./LinkButton";

export type Props = {
	integration: IntegrationOverview;
};

export default function IntegrationCard({ integration }: Props) {
	return (
		<article className={styles.integrationCard}>
			<header className={styles.header}>
				<Icon title={integration.icon.title} path={integration.icon.path} />
				<h3>{integration.name}</h3>
			</header>
			<p className={styles.description}>{integration.description}</p>
			<h4 className={styles.featuresHeader}>Features</h4>
			<ul className={styles.featuresList}>
				{integration.features.map((feature, index) => (
					<li className={styles.feature} key={index}>
						<span className={styles.icon}>
							<Icon title={siCheckmarx.title} path={siCheckmarx.path} size={12} />
						</span>
						{feature}
					</li>
				))}
			</ul>
			<LinkButton href="/connect">Connect</LinkButton>
		</article>
	);
}
