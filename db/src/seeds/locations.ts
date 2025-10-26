import type { locationsTable, UniqueColumns } from "@db/schemas";

export const locationsSeed = [
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
] satisfies Array<UniqueColumns<typeof locationsTable.$inferInsert>>;

export type LocationNameJa = (typeof locationsSeed)[number]["nameJa"];
