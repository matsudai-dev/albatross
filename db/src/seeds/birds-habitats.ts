import type { BirdNameJa } from "@db/seeds/birds";
import type { HabitatNameJa } from "@db/seeds/habitats";

export const birdsHabitatsSeed = [
	{
		birdNameJa: "スズメ",
		habitatNameJa: ["住宅街", "都市公園", "河川敷"],
	},
	{
		birdNameJa: "カワラバト",
		habitatNameJa: ["住宅街", "都市公園"],
	},
] satisfies Array<{
	birdNameJa: BirdNameJa;
	habitatNameJa: Array<HabitatNameJa>;
}>;
