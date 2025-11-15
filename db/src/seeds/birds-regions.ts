import type { BirdNameJa } from "@db/seeds/birds";
import type { RegionNameJa } from "@db/seeds/regions";

export const birdsRegionsSeed = [
	{
		birdNameJa: "スズメ",
		regionNameJa: ["北海道", "本州", "沖縄"],
	},
	{
		birdNameJa: "カワラバト",
		regionNameJa: ["本州", "沖縄"],
	},
] satisfies Array<{
	birdNameJa: BirdNameJa;
	regionNameJa: Array<RegionNameJa>;
}>;
