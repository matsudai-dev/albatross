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

interface BirdRow {
	id: number;
	nameJa: string;
	regions: Array<string>;
	habitats: Array<string>;
	migrationTypes: Array<string>;
	startMonth: number | null;
	endMonth: number | null;
}

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
		<div class="py-8 text-center">
			<title>野鳥一覧</title>
			<h1 class="text-2xl font-bold mb-4">野鳥一覧</h1>
			<table>
				<thead>
					<tr>
						<th>和名</th>
						<th>生息域</th>
						<th>生息環境</th>
						<th>渡り区分</th>
						<th>到着月</th>
						<th>出発月</th>
					</tr>
				</thead>
				<tbody>
					{birds.map((row) => (
						<tr key={String(row.id)} data-testid="bird-row">
							<td>{row.nameJa}</td>
							<td>{row.regions.join(",")}</td>
							<td>{row.habitats.join(",")}</td>
							<td>{row.migrationTypes.join(",")}</td>
							<td>{row.startMonth}</td>
							<td>{row.endMonth}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>,
	);
});
