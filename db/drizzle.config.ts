import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./db/drizzle",
	schema: "./db/src/schemas.ts",
	dialect: "sqlite",
});
