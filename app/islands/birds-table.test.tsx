import { describe, expect, it } from "bun:test";
import {
	getElementsByAttribute,
	getElementsByTagName,
	getTextContent,
	parseJSXElement,
} from "@/utils/html-parser";
import BirdsTable, { type BirdRow } from "./birds-table";

const mockBirds: Array<BirdRow> = [
	{
		id: 1,
		nameJa: "スズメ",
		regions: ["北海道", "本州"],
		habitats: ["市街地", "農耕地"],
		migrationTypes: ["留鳥"],
		startMonth: null,
		endMonth: null,
	},
	{
		id: 2,
		nameJa: "ツバメ",
		regions: ["九州"],
		habitats: ["市街地"],
		migrationTypes: ["夏鳥"],
		startMonth: 3,
		endMonth: 10,
	},
];

describe("BirdsTable", () => {
	it("should render table headers", () => {
		const tree = parseJSXElement(<BirdsTable birds={mockBirds} />);

		const headerCells = getElementsByTagName(tree, "th");

		const expectedHeaders = [
			"和名",
			"生息域",
			"生息環境",
			"渡り区分",
			"到着月",
			"出発月",
		];
		expect(headerCells.length).toBe(expectedHeaders.length);

		const actualHeaders = headerCells.map(getTextContent);
		expect(actualHeaders).toEqual(expectedHeaders);
	});

	it("should render bird data correctly", () => {
		const tree = parseJSXElement(<BirdsTable birds={mockBirds} />);

		const rows = getElementsByAttribute(tree, "data-testid", "bird-row");
		expect(rows.length).toBe(mockBirds.length);

		if (!rows[0]) {
			throw new Error("No rows found");
		}

		const firstRowCells = getElementsByTagName(rows[0], "td");
		const firstRowData = firstRowCells.map(getTextContent);
		expect(firstRowData).toEqual([
			"スズメ",
			"北海道,本州",
			"市街地,農耕地",
			"留鳥",
			"-",
			"-",
		]);
	});
});
