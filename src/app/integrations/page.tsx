import LinkButton from "@/ui/LinkButton";

import styles from "./page.module.css";

export default async function Integrations() {
	return (
		<div className="container">
			<section className={styles.header}>
				<h1>Integrations</h1>
				<LinkButton href="/integrations/add">Add Integration</LinkButton>
			</section>
		</div>
	);
}
