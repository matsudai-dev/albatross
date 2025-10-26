import type { LocationNameJa } from "@db/seeds/locations";
import type { BirdNameJa } from "@db/seeds/birds";

export const birdsLocationsSeed = [
	{
		birdNameJa: "スズメ",
		locationNameJa: ["住宅街", "都市公園", "河川敷"],
	},
	{
		birdNameJa: "カワラバト",
		locationNameJa: ["住宅街", "都市公園"],
	},
] satisfies Array<{
	birdNameJa: BirdNameJa;
	locationNameJa: Array<LocationNameJa>;
}>;
