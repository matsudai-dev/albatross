import { DB_SYSTEM_USER } from "@common/consts";
import { sql } from "drizzle-orm";
import {
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
