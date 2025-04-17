import { DatabaseSync } from "node:sqlite";

import { migrate } from "@/repository/sqlite";

export default async function SQLite() {
    const db = new DatabaseSync(':memory:');
    migrate(db);

    const githubIntegrations = db.prepare("SELECT * FROM integration_github").all();
    const jiraIntegrations = db.prepare("SELECT * FROM integration_jira").all();
    const features = db.prepare("SELECT * FROM feature").all();
    const githubSources = db.prepare("SELECT * FROM source_github_pull_request").all();
    const jiraSources = db.prepare("SELECT * FROM source_jira_issue").all();

	return (
		<div className="container">
			<section>
				<h1>SQLite Debug</h1>
			</section>
            <section>
                <h2>GitHub Integrations</h2>
                <ul>
                    {githubIntegrations.map((integration, index) => (
                        <li key={index}>{JSON.stringify(integration)}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Jira Integrations</h2>
                <ul>
                    {jiraIntegrations.map((integration, index) => (
                        <li key={index}>{JSON.stringify(integration)}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Features</h2>
                <ul>
                    {features.map((feature, index) => (
                        <li key={index}>{JSON.stringify(feature)}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>GitHub Sources</h2>
                <ul>
                    {githubSources.map((source, index) => (
                        <li key={index}>{JSON.stringify(source)}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Jira Sources</h2>
                <ul>
                    {jiraSources.map((source, index) => (
                        <li key={index}>{JSON.stringify(source)}</li>
                    ))}
                </ul>
            </section>
		</div>
	);
}
