import type { PropsWithChildren } from "react";

import styles from "./Card.module.css";

export default function Card({ children }: PropsWithChildren) {
	return <article className={styles.card}>{children}</article>;
}
