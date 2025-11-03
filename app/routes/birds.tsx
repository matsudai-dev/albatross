import { getDbClient } from "@db/client";
import {
	birdMigrationRegionsTable,
	birdsHabitatsTable,
	birdsRegionsTable,
	birdsTable,
	habitatsTable,
	migrationTypesTable,
	regionsTable,
} from "@db/schemas";
import { eq, sql } from "drizzle-orm";
import { createRoute } from "honox/factory";
import BirdsTable, { type BirdRow } from "@/islands/birds-table";

export default createRoute(async (c) => {
	const db = getDbClient(c.env.DB);
	const results = await db
		.select({
			id: birdsTable.id,
			nameJa: birdsTable.nameJa,
			regions: sql<string>`GROUP_CONCAT(DISTINCT ${regionsTable.nameJa})`,
			habitats: sql<string>`GROUP_CONCAT(DISTINCT ${habitatsTable.nameJa})`,
			migrationTypes: sql<string>`GROUP_CONCAT(DISTINCT ${migrationTypesTable.nameJa})`,
			startMonth: birdMigrationRegionsTable.startMonth,
			endMonth: birdMigrationRegionsTable.endMonth,
		})
		.from(birdsTable)
		.leftJoin(birdsRegionsTable, eq(birdsTable.id, birdsRegionsTable.birdId))
		.leftJoin(regionsTable, eq(birdsRegionsTable.regionId, regionsTable.id))
		.leftJoin(
			birdMigrationRegionsTable,
			eq(birdsTable.id, birdMigrationRegionsTable.birdId),
		)
		.leftJoin(
			migrationTypesTable,
			eq(birdMigrationRegionsTable.migrationTypeId, migrationTypesTable.id),
		)
		.leftJoin(birdsHabitatsTable, eq(birdsTable.id, birdsHabitatsTable.birdId))
		.leftJoin(habitatsTable, eq(birdsHabitatsTable.habitatId, habitatsTable.id))
		.groupBy(birdsTable.id);

	const birds: Array<BirdRow> = results.map((row) => ({
		id: row.id,
		nameJa: row.nameJa,
		regions: row.regions ? row.regions.split(",") : [],
		habitats: row.habitats ? row.habitats.split(",") : [],
		migrationTypes: row.migrationTypes ? row.migrationTypes.split(",") : [],
		startMonth: row.startMonth,
		endMonth: row.endMonth,
	}));

	return c.render(
		<>
			<title>野鳥一覧</title>
			<h1>野鳥一覧</h1>
			<h2>いま見つけられる野鳥を探そう</h2>
			<BirdsTable birds={birds} />
		</>,
	);
});
