import { spawn } from "node:child_process";

const env = process.argv[2] || "staging";
const envFlag = env === "staging" ? "--env staging" : "";

console.log(`Starting seed for ${env}...`);

const wrangler = spawn(
	"wrangler",
	[
		"dev",
		"./db/src/seed.remote.ts",
		envFlag,
		"--remote",
		"--port",
		"8787",
	].filter(Boolean),
	{
		shell: true,
		detached: true,
		stdio: ["ignore", "pipe", "pipe"],
	},
);

wrangler.unref();

let output = "";
wrangler.stdout?.on("data", (data) => {
	output += data.toString();
	process.stdout.write(data);
});

wrangler.stderr?.on("data", (data) => {
	process.stderr.write(data);
});

let cleanupDone = false;

const cleanup = () => {
	if (cleanupDone) {
		return;
	}
	cleanupDone = true;

	const pid = wrangler.pid;
	if (!pid) {
		return;
	}

	if (process.platform === "win32") {
		spawn("taskkill", ["/pid", pid.toString(), "/f", "/t"], {
			shell: true,
			detached: true,
			stdio: "ignore",
		}).unref();
	} else {
		try {
			process.kill(-pid, "SIGKILL");
		} catch (error) {
			if (
				error &&
				typeof error === "object" &&
				"code" in error &&
				error.code !== "ESRCH"
			) {
				console.error("Failed to kill process group:", error);
			}
			try {
				process.kill(pid, "SIGKILL");
			} catch {
				// Ignore
			}
		}
	}
};

const checkServer = setInterval(async () => {
	if (output.includes("Ready on")) {
		clearInterval(checkServer);

		try {
			console.log("\nTriggering seed...");
			const response = await fetch("http://localhost:8787");
			const text = await response.text();
			console.log(`\nSeed response: ${text}`);

			cleanup();
			setTimeout(() => process.exit(response.ok ? 0 : 1), 3000);
		} catch (error) {
			console.error("Failed to trigger seed:", error);

			cleanup();
			setTimeout(() => process.exit(1), 3000);
		}
	}
}, 500);

setTimeout(() => {
	clearInterval(checkServer);
	console.error("Timeout waiting for server");
	cleanup();
	setTimeout(() => process.exit(1), 3000);
}, 30000);

process.on("SIGINT", () => {
	console.log("\nInterrupted");
	cleanup();
	setTimeout(() => process.exit(130), 3000);
});

process.on("exit", () => {
	cleanup();
});
