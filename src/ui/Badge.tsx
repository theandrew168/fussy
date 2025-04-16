import type { PropsWithChildren } from "react";

import styles from "./Badge.module.css";

export type Props = {
	style: "primary" | "secondary" | "outline";
};

export default function Badge({ style, children }: PropsWithChildren<Props>) {
	const styleClasses = {
		primary: styles.primary,
		secondary: styles.secondary,
		outline: styles.outline,
	};
	const styleClass = styleClasses[style] ?? styles.primary;
	return <span className={`${styles.badge} ${styleClass}`}>{children}</span>;
}
