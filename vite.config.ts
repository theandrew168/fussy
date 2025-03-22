import { defineConfig } from "vite";
import build from "@hono/vite-build/node";
import devServer from "@hono/vite-dev-server";

export default defineConfig({
	plugins: [
		build({
			entry: "src/index.tsx",
		}),
		devServer({
			entry: "src/index.tsx",
		}),
	],
});
