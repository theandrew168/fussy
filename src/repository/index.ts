import type { UUID } from "crypto";

import type { ContextConfig, Feature } from "@/model";

export type FeatureRepository = {
	create: (feature: Feature) => Promise<void>;
	list: () => Promise<Feature[]>;
	read: (id: UUID) => Promise<Feature>;
	update: (feature: Feature) => Promise<void>;
	delete: (id: UUID) => Promise<void>;

	addContextConfig: (featureID: UUID, config: ContextConfig) => Promise<void>;
	removeContextConfig: (featureID: UUID, configID: UUID) => Promise<void>;
};
