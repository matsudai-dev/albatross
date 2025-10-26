import type { D1Database } from "@cloudflare/workers-types";
import { birdsHabitatsTable, birdsTable, habitatsTable } from "@db/schemas";
import { birdsSeed } from "@db/seeds/birds";
import { birdsHabitatsSeed } from "@db/seeds/birds-habitats";
import { habitatsSeed } from "@db/seeds/habitats";
import { drizzle } from "drizzle-orm/d1";
import { getPlatformProxy } from "wrangler";

async function main() {
	console.log("Targeting local database...");

	const { env, dispose } = await getPlatformProxy<{ DB: D1Database }>({
		configPath: "./wrangler.jsonc",
		persist: true,
	});

	const db = drizzle(env.DB);

	try {
		console.log("Seeding birds...");
		await db.insert(birdsTable).values(birdsSeed).onConflictDoNothing();

		console.log("Seeding habitats...");
		await db.insert(habitatsTable).values(habitatsSeed).onConflictDoNothing();

		console.log("Seeding birds_habitats...");
		const allBirds = await db
			.select({ id: birdsTable.id, nameJa: birdsTable.nameJa })
			.from(birdsTable);
		const allHabitats = await db
			.select({ id: habitatsTable.id, nameJa: habitatsTable.nameJa })
			.from(habitatsTable);

		const birdsHabitatsToInsert: Array<{
			birdId: number;
			habitatId: number;
		}> = [];

		for (const entry of birdsHabitatsSeed) {
			const bird = allBirds.find((b) => b.nameJa === entry.birdNameJa);
			if (!bird) {
				console.warn(`Bird not found: ${entry.birdNameJa}`);
				continue;
			}

			for (const habitatNameJa of entry.habitatNameJa) {
				const habitat = allHabitats.find((l) => l.nameJa === habitatNameJa);
				if (!habitat) {
					console.warn(`Habitat not found: ${habitatNameJa}`);
					continue;
				}

				birdsHabitatsToInsert.push({
					birdId: bird.id,
					habitatId: habitat.id,
				});
			}
		}

		if (birdsHabitatsToInsert.length > 0) {
			await db
				.insert(birdsHabitatsTable)
				.values(birdsHabitatsToInsert)
				.onConflictDoNothing();
		}

		console.log("Seed script finished successfully.");
	} catch (e) {
		console.error("Seeding failed:", e);
	} finally {
		await dispose();
	}
}

main();
