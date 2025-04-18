export type Config = {
	githubAPIKey: string;
	jiraURL: string;
	jiraEmail: string;
	jiraAPIKey: string;
};

export class MissingConfigError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
	}
}

export function readConfigFromEnvironment(): Config {
	const githubAPIKey = process.env.GITHUB_API_KEY;
	if (!githubAPIKey) {
		throw new MissingConfigError("GITHUB_API_KEY is missing");
	}

	const jiraURL = process.env.JIRA_URL;
	if (!jiraURL) {
		throw new MissingConfigError("JIRA_URL is missing");
	}

	const jiraEmail = process.env.JIRA_EMAIL;
	if (!jiraEmail) {
		throw new MissingConfigError("JIRA_EMAIL is missing");
	}

	const jiraAPIKey = process.env.JIRA_API_KEY;
	if (!jiraAPIKey) {
		throw new MissingConfigError("JIRA_API_KEY is missing");
	}

	return {
		githubAPIKey,
		jiraURL,
		jiraEmail,
		jiraAPIKey,
	};
}
