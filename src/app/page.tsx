import Link from "next/link";

import styles from "./page.module.css";

export default async function Home() {
	const owner = "theandrew168";
	const repo = "fussy";
	const ref = "e4e2dc842022c35f7fe27a45effd1dc2602a23b6";

	const example = `${owner}/${repo}/${ref}`;

	return (
		<div className={styles.page}>
			<Link href={example}>Summarize an example commit</Link>
		</div>
	);
}
