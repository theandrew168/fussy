import Link from "next/link";
import type { PropsWithChildren } from "react";

import styles from "./LinkButton.module.css";

export type Props = {
	href: string;
};

export default function LinkButton({ href, children }: PropsWithChildren<Props>) {
	return (
		<Link href={href} className={styles.linkButton}>
			{children}
		</Link>
	);
}
