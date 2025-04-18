import type { UUID } from "node:crypto";

import type { Source } from "./source";

/**
 * One account can have many features.
 * Many features can have many sources.
 */
export type Feature = {
	id: UUID;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	sources: Source[];
};
