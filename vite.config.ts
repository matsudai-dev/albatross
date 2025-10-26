import build from "@hono/vite-build/cloudflare-workers";
import adapter from "@hono/vite-dev-server/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig } from "vite";

const resolve = {
	alias: {
		"@": `${process.cwd()}/app`,
		"@common": `${process.cwd()}/common/src`,
		"@db": `${process.cwd()}/db/src`,
	},
};

const server = {
	host: true,
	watch: {
		usePolling: true,
	},
};

export default defineConfig(() => {
	return {
		plugins: [
			honox({
				devServer: { adapter },
				client: { input: ["./app/client.ts", "./app/style.css"] },
			}),
			tailwindcss(),
			build(),
		],
		resolve,
		server,
	};
});
