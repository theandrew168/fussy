import type { UUID } from "node:crypto";

import type { Feature } from "@/domain/feature";
import type { FeatureRepository } from "@/domain/repository";
import type { Source } from "@/domain/source";

export class MemoryFeatureRepository implements FeatureRepository {
	private static instance?: MemoryFeatureRepository;
	private db: Map<UUID, Feature>;

	constructor() {
		this.db = new Map();
	}

	static getInstance(): MemoryFeatureRepository {
		if (!this.instance) {
			this.instance = new MemoryFeatureRepository();
		}

		return this.instance;
	}

	async create(feature: Feature): Promise<void> {
		this.db.set(feature.id, feature);
	}

	async list(): Promise<Feature[]> {
		return Array.from(this.db.values());
	}

	async read(featureID: UUID): Promise<Feature | undefined> {
		return this.db.get(featureID);
	}

	async update(feature: Feature): Promise<void> {
		if (!this.db.has(feature.id)) {
			throw new Error(`Feature with ID ${feature.id} does not exist.`);
		}

		this.db.set(feature.id, feature);
	}

	async delete(featureID: UUID): Promise<void> {
		this.db.delete(featureID);
	}

	async addSource(featureID: UUID, source: Source): Promise<void> {
		const feature = this.db.get(featureID);
		if (!feature) {
			throw new Error(`Feature with ID ${featureID} does not exist.`);
		}

		feature.sources.push(source);
		this.db.set(featureID, feature);
	}

	async removeSource(featureID: UUID, sourceID: UUID): Promise<void> {
		const feature = this.db.get(featureID);
		if (!feature) {
			throw new Error(`Feature with ID ${featureID} does not exist.`);
		}

		feature.sources = feature.sources.filter((source) => source.id !== sourceID);
		this.db.set(featureID, feature);
	}
}
