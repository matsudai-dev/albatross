import { DB_SYSTEM_USER } from "@common/consts";
import { sql } from "drizzle-orm";
import {
	check,
	index,
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

/** Common primary key field for all tables */
const commonPrimaryFields = {
	id: integer("id").primaryKey(),
};

/** Common audit fields for all tables */
const commonAuditFields = {
	createdBy: text("created_by").notNull().default(DB_SYSTEM_USER),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedBy: text("updated_by").notNull().default(DB_SYSTEM_USER),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
	deletedBy: text("deleted_by"),
	deletedAt: integer("deleted_at", { mode: "timestamp" }),
};

/** Utility type to extract unique columns from a table schema */
export type UniqueColumns<T> = Omit<
	T,
	keyof typeof commonPrimaryFields | keyof typeof commonAuditFields
>;

/** Schema for `birds` table */
export const birdsTable = sqliteTable(
	"birds",
	{
		...commonPrimaryFields,
		latinName: text("latin_name").notNull().unique(),
		nameJa: text("name_ja").notNull(),
		nameEn: text("name_en").notNull(),
		...commonAuditFields,
	},
	(t) => [
		index("birds_id_index").on(t.id),
		index("birds_latin_name_index").on(t.latinName),
		index("birds_name_ja_index").on(t.nameJa),
		index("birds_name_en_index").on(t.nameEn),
	],
);

/** Schema for `regions` table */
export const regionsTable = sqliteTable(
	"regions",
	{
		...commonPrimaryFields,
		nameJa: text("name_ja").notNull().unique(),
		...commonAuditFields,
	},
	(t) => [
		index("regions_id_index").on(t.id),
		index("regions_name_ja_index").on(t.nameJa),
	],
);

/** Schema for `migration_types` table */
export const migrationTypesTable = sqliteTable(
	"migration_types",
	{
		...commonPrimaryFields,
		nameJa: text("name_ja").notNull().unique(),
		...commonAuditFields,
	},
	(t) => [
		index("migration_types_id_index").on(t.id),
		index("migration_types_name_ja_index").on(t.nameJa),
	],
);

/** Schema for `habitats` table */
export const habitatsTable = sqliteTable(
	"habitats",
	{
		...commonPrimaryFields,
		nameJa: text("name_ja").notNull().unique(),
		...commonAuditFields,
	},
	(t) => [
		index("habitats_id_index").on(t.id),
		index("habitats_name_ja_index").on(t.nameJa),
	],
);

export const birdsRegionsTable = sqliteTable(
	"birds_regions",
	{
		birdId: integer("bird_id")
			.notNull()
			.references(() => birdsTable.id),
		regionId: integer("region_id")
			.notNull()
			.references(() => regionsTable.id),
		...commonAuditFields,
	},
	(t) => [
		primaryKey({ columns: [t.birdId, t.regionId] }),
		index("birds_regions_bird_id_index").on(t.birdId),
		index("birds_regions_region_id_index").on(t.regionId),
	],
);

/** Schema for `bird_migration_types_regions` table */
export const birdMigrationRegionsTable = sqliteTable(
	"bird_migration_types_regions",
	{
		birdId: integer("bird_id")
			.notNull()
			.references(() => birdsTable.id),
		regionId: integer("region_id")
			.notNull()
			.references(() => regionsTable.id),
		migrationTypeId: integer("migration_type_id")
			.notNull()
			.references(() => migrationTypesTable.id),
		startMonth: integer("start_month").notNull(),
		endMonth: integer("end_month").notNull(),
		...commonAuditFields,
	},
	(t) => [
		primaryKey({ columns: [t.birdId, t.regionId] }),
		index("bird_migration_types_regions_bird_id_index").on(t.birdId),
		index("bird_migration_types_regions_region_id_index").on(t.regionId),
		index("bird_migration_types_regions_migration_type_id_index").on(
			t.migrationTypeId,
		),
		check(
			"bird_migration_types_regions_start_month_check",
			sql`${t.startMonth} BETWEEN 1 AND 12`,
		),
		check(
			"bird_migration_types_regions_end_month_check",
			sql`${t.endMonth} BETWEEN 1 AND 12`,
		),
	],
);

/** Schema for `birds_habitats` table */
export const birdsHabitatsTable = sqliteTable(
	"birds_habitats",
	{
		birdId: integer("bird_id")
			.notNull()
			.references(() => birdsTable.id),
		habitatId: integer("habitat_id")
			.notNull()
			.references(() => habitatsTable.id),
		...commonAuditFields,
	},
	(t) => [primaryKey({ columns: [t.birdId, t.habitatId] })],
);
