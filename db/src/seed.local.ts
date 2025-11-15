import type { D1Database } from "@cloudflare/workers-types";
import {
	birdMigrationRegionsTable,
	birdsHabitatsTable,
	birdsRegionsTable,
	birdsTable,
	habitatsTable,
	migrationTypesTable,
	regionsTable,
} from "@db/schemas";
import { birdsSeed } from "@db/seeds/birds";
import { birdsHabitatsSeed } from "@db/seeds/birds-habitats";
import { habitatsSeed } from "@db/seeds/habitats";
import { migrationTypesSeed } from "@db/seeds/migration-types";
import { regionsSeed } from "@db/seeds/regions";
import { drizzle } from "drizzle-orm/d1";
import { getPlatformProxy } from "wrangler";
import { birdsMigrationTypesRegionsSeed } from "./seeds/bird-migration-types-regions";
import { birdsRegionsSeed } from "./seeds/birds-regions";

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

		console.log("Seeding regions...");
		await db.insert(regionsTable).values(regionsSeed).onConflictDoNothing();

		console.log("Seeding habitats...");
		await db.insert(habitatsTable).values(habitatsSeed).onConflictDoNothing();

		console.log("Seeding migration_types...");
		await db
			.insert(migrationTypesTable)
			.values(migrationTypesSeed)
			.onConflictDoNothing();

		console.log("Getting all birds...");
		const allBirds = await db
			.select({ id: birdsTable.id, nameJa: birdsTable.nameJa })
			.from(birdsTable);

		console.log("Getting all regions...");
		const allRegions = await db
			.select({ id: regionsTable.id, nameJa: regionsTable.nameJa })
			.from(regionsTable);

		console.log("Getting all habitats...");
		const allHabitats = await db
			.select({ id: habitatsTable.id, nameJa: habitatsTable.nameJa })
			.from(habitatsTable);

		console.log("Getting all migration_types...");
		const allMigrationTypes = await db
			.select({
				id: migrationTypesTable.id,
				nameJa: migrationTypesTable.nameJa,
			})
			.from(migrationTypesTable);

		console.log("Seeding birds_regions...");

		const birdsRegionsToInsert: Array<{
			birdId: number;
			regionId: number;
		}> = [];

		for (const entry of birdsRegionsSeed) {
			const bird = allBirds.find((b) => b.nameJa === entry.birdNameJa);
			if (!bird) {
				console.warn(`Bird not found: ${entry.birdNameJa}`);
				continue;
			}

			for (const regionNameJa of entry.regionNameJa) {
				const region = allRegions.find((r) => r.nameJa === regionNameJa);
				if (!region) {
					console.warn(`Region not found: ${regionNameJa}`);
					continue;
				}

				birdsRegionsToInsert.push({
					birdId: bird.id,
					regionId: region.id,
				});
			}
		}

		if (birdsRegionsToInsert.length > 0) {
			await db
				.insert(birdsRegionsTable)
				.values(birdsRegionsToInsert)
				.onConflictDoNothing();
		}

		console.log("Seeding birds_habitats...");

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

		console.log("Seeding bird_migration_types_regions...");

		const birdsMigrationTypesRegionsToInsert: Array<{
			birdId: number;
			migrationTypeId: number;
			regionId: number;
			startMonth: number;
			endMonth: number;
		}> = [];

		for (const entry of birdsMigrationTypesRegionsSeed) {
			const bird = allBirds.find((b) => b.nameJa === entry.birdNameJa);
			if (!bird) {
				console.warn(`Bird not found: ${entry.birdNameJa}`);
				continue;
			}

			const migrationType = allMigrationTypes.find(
				(m) => m.nameJa === entry.migrationTypeNameJa,
			);
			if (!migrationType) {
				console.warn(`Migration type not found: ${entry.migrationTypeNameJa}`);
				continue;
			}

			const region = allRegions.find((r) => r.nameJa === entry.regionNameJa);
			if (!region) {
				console.warn(`Region not found: ${entry.regionNameJa}`);
				continue;
			}

			birdsMigrationTypesRegionsToInsert.push({
				birdId: bird.id,
				migrationTypeId: migrationType.id,
				regionId: region.id,
				startMonth: entry.startMonth,
				endMonth: entry.endMonth,
			});
		}

		if (birdsMigrationTypesRegionsToInsert.length > 0) {
			await db
				.insert(birdMigrationRegionsTable)
				.values(birdsMigrationTypesRegionsToInsert)
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
