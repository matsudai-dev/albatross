import type { regionsTable, UniqueColumns } from "@db/schemas";

export const regionsSeed = [
	{
		nameJa: "北海道" as const,
	},
	{
		nameJa: "本州" as const,
	},
	{
		nameJa: "沖縄" as const,
	},
] satisfies Array<UniqueColumns<typeof regionsTable.$inferInsert>>;

export type RegionNameJa = (typeof regionsSeed)[number]["nameJa"];
