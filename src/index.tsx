import { Hono } from "hono";
import { Octokit } from "octokit";

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

export default app;
