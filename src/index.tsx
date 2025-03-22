import Anthropic from "@anthropic-ai/sdk";
import { Hono } from "hono";
import { Octokit } from "octokit";

const client = new Anthropic();

const octokit = new Octokit();

const app = new Hono();
app.get("/", (c) => {
	return c.text("Hello Node.js!\n");
});
app.get("/gh", async (c) => {
	const resp = await octokit.rest.repos.get({
		owner: "honojs",
		repo: "hono",
	});
	return c.json(resp.data);
});
app.get("/ai", async (c) => {
	const message = await client.messages.create({
		max_tokens: 1024,
		messages: [{ role: "user", content: "Hello, Claude" }],
		model: "claude-3-7-sonnet-latest",
	});
	return c.json(message);
});

export default app;
