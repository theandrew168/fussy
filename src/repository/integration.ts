import type { UUID } from "node:crypto";
import type { DatabaseSync } from "node:sqlite";

import type { Integration } from "@/domain/model";
import type { IntegrationRepository } from "@/domain/repository";

export class MemoryIntegrationRepository implements IntegrationRepository {
    private db: Map<UUID, Integration>;

    constructor() {
        this.db = new Map();
    }

    async create(integration: Integration): Promise<void> {
        this.db.set(integration.id, integration);
    }

    async list(): Promise<Integration[]> {
        return Array.from(this.db.values());
    }

    async read(integrationID: UUID): Promise<Integration | undefined> {
        return this.db.get(integrationID);
    }

    async delete(integrationID: UUID): Promise<void> {
        this.db.delete(integrationID);
    }
}

export class SQLiteIntegrationRepository implements IntegrationRepository {
    private db: DatabaseSync;

    constructor(db: DatabaseSync) {
        this.db = db;
    }

    async create(integration: Integration): Promise<void> {
        switch (integration.type) {
            case "github": {
                const stmt = this.db.prepare(`
                    INSERT INTO integration_github
                        (id, url, created_at, updated_at)
                    VALUES
                        (?, ?, ?, ?)
                `);
                stmt.run(integration.id, integration.url, integration.createdAt.toISOString(), integration.updatedAt.toISOString());
            }
            case "jira": {
                const stmt = this.db.prepare(`
                    INSERT INTO integration_jira
                        (id, url, created_at, updated_at)
                    VALUES
                        (?, ?, ?, ?)
                `);
                stmt.run(integration.id, integration.url, integration.createdAt.toISOString(), integration.updatedAt.toISOString());
            }
        }
    }

    async list(): Promise<Integration[]> {
        return [];
    }

    async read(integrationID: UUID): Promise<Integration | undefined> {
        return undefined;
    }

    async delete(integrationID: UUID): Promise<void> {
        
    }
}