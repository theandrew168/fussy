import type { UUID } from "node:crypto";

import type { Source, Feature } from "@/model";

export type IntegrationRepository = {};

export type FeatureRepository = {
	create: (feature: Feature) => Promise<void>;
	list: () => Promise<Feature[]>;
	read: (id: UUID) => Promise<Feature>;
	update: (feature: Feature) => Promise<void>;
	delete: (id: UUID) => Promise<void>;

	addContextConfig: (featureID: UUID, config: Source) => Promise<void>;
	removeContextConfig: (featureID: UUID, configID: UUID) => Promise<void>;
};
