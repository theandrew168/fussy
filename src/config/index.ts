export type GitHubConfig = {
	apiKey: string;
};

export type JiraConfig = {
	url: string;
	email: string;
	apiKey: string;
};

export type Config = {
	github?: GitHubConfig;
	jira?: JiraConfig;
};

export class MissingConfigError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
	}
}

export function readConfigFromEnvironment(): Config {
	const config: Config = {};

	const githubAPIKey = process.env.GITHUB_API_KEY;
	if (githubAPIKey) {
		config.github = {
			apiKey: githubAPIKey,
		};
	}

	const jiraURL = process.env.JIRA_URL;
	const jiraEmail = process.env.JIRA_EMAIL;
	const jiraAPIKey = process.env.JIRA_API_KEY;
	if (jiraURL && jiraEmail && jiraAPIKey) {
		config.jira = {
			url: jiraURL,
			email: jiraEmail,
			apiKey: jiraAPIKey,
		};
	}

	return config;
}
