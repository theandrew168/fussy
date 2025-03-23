import Link from "next/link";

import styles from "./page.module.css";

export default async function Home() {
	const owner = "theandrew168";
	const repo = "bloggulus";
	const ref = "df9a7b0095c0377cb18689f049ecd7f658f8d873";

	const example = `${owner}/${repo}/${ref}`;

	return (
		<div className={styles.page}>
			<Link href={example}>Example Commit</Link>
		</div>
	);
}
