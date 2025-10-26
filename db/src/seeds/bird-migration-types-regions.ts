import type { BirdNameJa } from "@db/seeds/birds";
import type { MigrationTypeNameJa } from "@db/seeds/migration-types";
import type { RegionNameJa } from "@db/seeds/regions";

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const birdsMigrationTypesRegionsSeed = [
	{
		birdNameJa: "スズメ",
		regionNameJa: "北海道",
		migrationTypeNameJa: "留鳥",
		startMonth: 1,
		endMonth: 12,
	},
	{
		birdNameJa: "スズメ",
		regionNameJa: "本州",
		migrationTypeNameJa: "留鳥",
		startMonth: 1,
		endMonth: 12,
	},
	{
		birdNameJa: "スズメ",
		regionNameJa: "沖縄",
		migrationTypeNameJa: "留鳥",
		startMonth: 1,
		endMonth: 12,
	},
	{
		birdNameJa: "カワラバト",
		regionNameJa: "本州",
		migrationTypeNameJa: "留鳥",
		startMonth: 1,
		endMonth: 12,
	},
	{
		birdNameJa: "カワラバト",
		regionNameJa: "沖縄",
		migrationTypeNameJa: "留鳥",
		startMonth: 1,
		endMonth: 12,
	},
] satisfies Array<{
	birdNameJa: BirdNameJa;
	regionNameJa: RegionNameJa;
	migrationTypeNameJa: MigrationTypeNameJa;
	startMonth: Month;
	endMonth: Month;
}>;
