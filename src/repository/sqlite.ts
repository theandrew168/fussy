import type { UUID } from "node:crypto";
import { DatabaseSync } from "node:sqlite";

import type { Integration } from "@/domain/model";
import type { IntegrationRepository } from "@/domain/repository";

export function connect() {
	const db = new DatabaseSync(":memory:");
	migrate(db);
	return db;
}

export function migrate(db: DatabaseSync) {
	db.exec(`
        CREATE TABLE IF NOT EXISTS integration_github (
            id TEXT PRIMARY KEY,
            url TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );
    `);

	db.exec(`
        CREATE TABLE IF NOT EXISTS integration_jira (
            id TEXT PRIMARY KEY,
            url TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );
    `);

	db.exec(`
        CREATE TABLE IF NOT EXISTS feature (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );
    `);

	db.exec(`
        CREATE TABLE IF NOT EXISTS source_github_pull_request (
            id TEXT PRIMARY KEY,
            feature_id TEXT NOT NULL REFERENCES feature(id) ON DELETE CASCADE,
            integration_id TEXT NOT NULL REFERENCES integration_github(id) ON DELETE CASCADE,
            owner TEXT NOT NULL,
            repo TEXT NOT NULL,
            pull_number TEXT NOT NULL
        );
    `);

	db.exec(`
        CREATE TABLE IF NOT EXISTS source_jira_issue (
            id TEXT PRIMARY KEY,
            feature_id TEXT NOT NULL REFERENCES feature(id) ON DELETE CASCADE,
            integration_id TEXT NOT NULL REFERENCES integration_jira(id) ON DELETE CASCADE,
            issue_key TEXT NOT NULL
        );
    `);
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
				stmt.run(
					integration.id,
					integration.url,
					integration.createdAt.toISOString(),
					integration.updatedAt.toISOString(),
				);
			}
			case "jira": {
				const stmt = this.db.prepare(`
                    INSERT INTO integration_jira
                        (id, url, created_at, updated_at)
                    VALUES
                        (?, ?, ?, ?)
                `);
				stmt.run(
					integration.id,
					integration.url,
					integration.createdAt.toISOString(),
					integration.updatedAt.toISOString(),
				);
			}
		}
	}

	async list(): Promise<Integration[]> {
		return [];
	}

	async read(integrationID: UUID): Promise<Integration | undefined> {
		return undefined;
	}

	async delete(integrationID: UUID): Promise<void> {}
}
