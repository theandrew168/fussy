import type { UUID } from "node:crypto";

import type { Feature, Integration, Source } from "./model";

export type IntegrationRepository = {
	create: (integration: Integration) => Promise<void>;
	list: () => Promise<Integration[]>;
	read: (integrationID: UUID) => Promise<Integration | undefined>;
	delete: (integrationID: UUID) => Promise<void>;
};

export type FeatureRepository = {
	create: (feature: Feature) => Promise<void>;
	list: () => Promise<Feature[]>;
	read: (featureID: UUID) => Promise<Feature>;
	update: (feature: Feature) => Promise<void>;
	delete: (featureID: UUID) => Promise<void>;

	addSource: (featureID: UUID, source: Source) => Promise<void>;
	removeSource: (featureID: UUID, sourceID: UUID) => Promise<void>;
};
