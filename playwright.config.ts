import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./e2e",
	outputDir: "./e2e/.reports/",
	timeout: 30 * 1000,
	expect: {
		timeout: 5 * 1000,
	},
	forbidOnly: true,
	retries: 1,
	workers: 1,
	reporter: "list",
	use: {
		headless: true,
		baseURL: "http://localhost:8787",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
	],
	webServer: [
		{
			command: "wrangler dev --ip 0.0.0.0",
			port: 8787,
			reuseExistingServer: false,
		},
	],
});
