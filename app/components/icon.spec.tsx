import { describe, expect, test } from "bun:test";
import {
	getElementsByAttribute,
	getElementsByTagName,
	parseJSXElement,
} from "@/utils/html-parser";
import { MyIcon } from "./icon";

describe("MyIcon", () => {
	test("renders span element with mdi classes", () => {
		const root = parseJSXElement(<MyIcon mdi="home" />);
		const spans = getElementsByTagName(root, "span");

		expect(spans.length).toBe(1);
		const span = spans[0];
		if (!span) throw new Error("Expected span element to exist");

		if (span.type === "Element") {
			expect(span.attributes.class).toContain("mdi");
			expect(span.attributes.class).toContain("mdi-home");
		}
	});

	test("applies medium size by default", () => {
		const root = parseJSXElement(<MyIcon mdi="search" />);
		const spans = getElementsByTagName(root, "span");

		const span = spans[0];
		if (!span) throw new Error("Expected span element to exist");

		if (span.type === "Element") {
			expect(span.attributes.class).toContain("text-xl");
		}
	});

	test("applies small size when specified", () => {
		const root = parseJSXElement(<MyIcon mdi="menu" size="small" />);
		const spans = getElementsByTagName(root, "span");

		const span = spans[0];
		if (!span) throw new Error("Expected span element to exist");

		if (span.type === "Element") {
			expect(span.attributes.class).toContain("text-base");
		}
	});

	test("applies large size when specified", () => {
		const root = parseJSXElement(<MyIcon mdi="close" size="large" />);
		const spans = getElementsByTagName(root, "span");

		const span = spans[0];
		if (!span) throw new Error("Expected span element to exist");

		if (span.type === "Element") {
			expect(span.attributes.class).toContain("text-2xl");
		}
	});

	test("applies custom className", () => {
		const root = parseJSXElement(
			<MyIcon mdi="star" className="text-yellow-500" />,
		);
		const spans = getElementsByTagName(root, "span");

		const span = spans[0];
		if (!span) throw new Error("Expected span element to exist");

		if (span.type === "Element") {
			expect(span.attributes.class).toContain("text-yellow-500");
		}
	});

	test("combines size and custom className", () => {
		const root = parseJSXElement(
			<MyIcon mdi="heart" size="large" className="text-red-500" />,
		);
		const spans = getElementsByTagName(root, "span");

		const span = spans[0];
		if (!span) throw new Error("Expected span element to exist");

		if (span.type === "Element") {
			expect(span.attributes.class).toContain("text-2xl");
			expect(span.attributes.class).toContain("text-red-500");
		}
	});

	test("includes aria-hidden attribute for accessibility", () => {
		const root = parseJSXElement(<MyIcon mdi="info" />);
		const spans = getElementsByAttribute(root, "aria-hidden");

		expect(spans.length).toBe(1);
		const span = spans[0];
		if (!span) throw new Error("Expected span element to exist");

		if (span.type === "Element") {
			expect(span.attributes["aria-hidden"]).toBe("true");
		}
	});

	test("handles icon names with hyphens", () => {
		const root = parseJSXElement(<MyIcon mdi="weather-sunny" />);
		const spans = getElementsByTagName(root, "span");

		const span = spans[0];
		if (!span) throw new Error("Expected span element to exist");

		if (span.type === "Element") {
			expect(span.attributes.class).toContain("mdi-weather-sunny");
		}
	});

	test("renders different icons correctly", () => {
		const icons = ["home", "search", "menu", "close", "star"];

		for (const icon of icons) {
			const root = parseJSXElement(<MyIcon mdi={icon} />);
			const spans = getElementsByTagName(root, "span");

			const span = spans[0];
			if (!span) throw new Error(`Expected span element to exist for ${icon}`);

			if (span.type === "Element") {
				expect(span.attributes.class).toContain(`mdi-${icon}`);
			}
		}
	});

	test("all size variants have correct classes", () => {
		const sizes = [
			{ size: "small" as const, class: "text-base" },
			{ size: "medium" as const, class: "text-xl" },
			{ size: "large" as const, class: "text-2xl" },
		];

		for (const { size, class: expectedClass } of sizes) {
			const root = parseJSXElement(<MyIcon mdi="test" size={size} />);
			const spans = getElementsByTagName(root, "span");

			const span = spans[0];
			if (!span)
				throw new Error(`Expected span element to exist for size ${size}`);

			if (span.type === "Element") {
				expect(span.attributes.class).toContain(expectedClass);
			}
		}
	});
});
