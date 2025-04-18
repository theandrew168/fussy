import type { UUID } from "node:crypto";

import type { Feature, Source } from "./model";

export type FeatureRepository = {
	create: (feature: Feature) => Promise<void>;
	list: () => Promise<Feature[]>;
	read: (featureID: UUID) => Promise<Feature | undefined>;
	update: (feature: Feature) => Promise<void>;
	delete: (featureID: UUID) => Promise<void>;

	addSource: (featureID: UUID, source: Source) => Promise<void>;
	removeSource: (featureID: UUID, sourceID: UUID) => Promise<void>;
};
