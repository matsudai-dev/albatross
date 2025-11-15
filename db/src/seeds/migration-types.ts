import type { migrationTypesTable, UniqueColumns } from "@db/schemas";

export const migrationTypesSeed = [
	{
		nameJa: "留鳥" as const,
	},
	{
		nameJa: "夏鳥" as const,
	},
	{
		nameJa: "冬鳥" as const,
	},
] satisfies Array<UniqueColumns<typeof migrationTypesTable.$inferInsert>>;

export type MigrationTypeNameJa = (typeof migrationTypesSeed)[number]["nameJa"];
