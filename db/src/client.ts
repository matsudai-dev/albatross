import type { D1Database } from "@cloudflare/workers-types";
import { birdsLocationsTable, birdsTable, locationsTable } from "@db/schemas";
import { drizzle } from "drizzle-orm/d1";

export function getDbClient(d1: D1Database) {
	return drizzle(d1, {
		schema: {
			birdsTable,
			locationsTable,
			birdsLocationsTable,
		},
	});
}
