import type { D1Database } from "@cloudflare/workers-types";
import { birdsLocationsTable, birdsTable, locationsTable } from "@db/schemas";
import { birdsSeed } from "@db/seeds/birds";
import { birdsLocationsSeed } from "@db/seeds/birds-locations";
import { locationsSeed } from "@db/seeds/locations";
import { drizzle } from "drizzle-orm/d1";

export default {
	async fetch(_request: Request, env: { DB: D1Database }) {
		const db = drizzle(env.DB);

		try {
			console.log("Seeding birds...");
			await db.insert(birdsTable).values(birdsSeed).onConflictDoNothing();

			console.log("Seeding locations...");
			await db
				.insert(locationsTable)
				.values(locationsSeed)
				.onConflictDoNothing();

			console.log("Seeding birds_locations...");
			const allBirds = await db
				.select({ id: birdsTable.id, nameJa: birdsTable.nameJa })
				.from(birdsTable);
			const allLocations = await db
				.select({ id: locationsTable.id, nameJa: locationsTable.nameJa })
				.from(locationsTable);

			const birdsLocationsToInsert: Array<{
				birdId: number;
				locationId: number;
			}> = [];

			for (const entry of birdsLocationsSeed) {
				const bird = allBirds.find((b) => b.nameJa === entry.birdNameJa);
				if (!bird) {
					console.warn(`Bird not found: ${entry.birdNameJa}`);
					continue;
				}

				for (const locationNameJa of entry.locationNameJa) {
					const location = allLocations.find(
						(l) => l.nameJa === locationNameJa,
					);
					if (!location) {
						console.warn(`Location not found: ${locationNameJa}`);
						continue;
					}

					birdsLocationsToInsert.push({
						birdId: bird.id,
						locationId: location.id,
					});
				}
			}

			if (birdsLocationsToInsert.length > 0) {
				await db
					.insert(birdsLocationsTable)
					.values(birdsLocationsToInsert)
					.onConflictDoNothing();
			}

			return new Response("Seed script finished successfully.", {
				status: 200,
			});
		} catch (e) {
			console.error("Seeding failed:", e);
			return new Response(`Seeding failed: ${e}`, { status: 500 });
		}
	},
};
