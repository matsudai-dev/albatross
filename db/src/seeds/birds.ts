import type { birdsTable, UniqueColumns } from "@db/schemas";

export const birdsSeed = [
	{
		latinName: "Passer montanus" as const,
		nameJa: "スズメ" as const,
		nameEn: "Eurasian Tree Sparrow" as const,
	},
	{
		latinName: "Columba livia" as const,
		nameJa: "カワラバト" as const,
		nameEn: "Rock Pigeon" as const,
	},
] satisfies Array<UniqueColumns<typeof birdsTable.$inferInsert>>;

export type BirdNameJa = (typeof birdsSeed)[number]["nameJa"];
