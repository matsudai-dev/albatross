import type { habitatsTable, UniqueColumns } from "@db/schemas";

export const habitatsSeed = [
	{
		nameJa: "住宅街" as const,
	},
	{
		nameJa: "都市公園" as const,
	},
	{
		nameJa: "河川" as const,
	},
	{
		nameJa: "河川敷" as const,
	},
] satisfies Array<UniqueColumns<typeof habitatsTable.$inferInsert>>;

export type HabitatNameJa = (typeof habitatsSeed)[number]["nameJa"];
