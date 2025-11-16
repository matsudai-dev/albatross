import { describe, expect, it } from "bun:test";
import {
	getElementsByTagName,
	getTextContent,
	parseJSXElement,
} from "@/utils/html-parser";
import { MyChip } from "./chip";

describe("MyChip", () => {
	it("should render with default variant and medium size", () => {
		const jsx = <MyChip>Test</MyChip>;
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		expect(spans.length).toBe(1);
		const span = spans[0];
		if (!span) {
			throw new Error("Expected span element to exist");
		}
		expect(getTextContent(span)).toBe("Test");
		if (span.type === "Element") {
			// Default variant should have default styling
			expect(span.attributes.class).toBeDefined();
			expect(span.attributes.class).toContain("bg-gray-200");
			expect(span.attributes.class).toContain("text-gray-800");
		}
	});

	it("should render with outlined variant", () => {
		const jsx = <MyChip variant="outlined">Outlined</MyChip>;
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		expect(spans.length).toBe(1);
		const span = spans[0];
		if (!span) {
			throw new Error("Expected span element to exist");
		}
		expect(getTextContent(span)).toBe("Outlined");
		if (span.type === "Element") {
			expect(span.attributes.class).toContain("border");
			expect(span.attributes.class).toContain("bg-transparent");
		}
	});

	it("should render with filled variant", () => {
		const jsx = <MyChip variant="filled">Filled</MyChip>;
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		expect(spans.length).toBe(1);
		const span = spans[0];
		if (!span) {
			throw new Error("Expected span element to exist");
		}
		expect(getTextContent(span)).toBe("Filled");
		if (span.type === "Element") {
			expect(span.attributes.class).toContain("bg-blue-600");
			expect(span.attributes.class).toContain("text-white");
		}
	});

	it("should render with small size", () => {
		const jsx = <MyChip size="small">Small</MyChip>;
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		expect(spans.length).toBe(1);
		const span = spans[0];
		if (!span) {
			throw new Error("Expected span element to exist");
		}
		expect(getTextContent(span)).toBe("Small");
		if (span.type === "Element") {
			expect(span.attributes.class).toContain("text-xs");
			expect(span.attributes.class).toContain("px-2");
			expect(span.attributes.class).toContain("py-1");
		}
	});

	it("should render with medium size", () => {
		const jsx = <MyChip size="medium">Medium</MyChip>;
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		expect(spans.length).toBe(1);
		const span = spans[0];
		if (!span) {
			throw new Error("Expected span element to exist");
		}
		expect(getTextContent(span)).toBe("Medium");
		if (span.type === "Element") {
			expect(span.attributes.class).toContain("text-sm");
			expect(span.attributes.class).toContain("px-3");
			expect(span.attributes.class).toContain("py-1");
		}
	});

	it("should render with large size", () => {
		const jsx = <MyChip size="large">Large</MyChip>;
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		expect(spans.length).toBe(1);
		const span = spans[0];
		if (!span) {
			throw new Error("Expected span element to exist");
		}
		expect(getTextContent(span)).toBe("Large");
		if (span.type === "Element") {
			expect(span.attributes.class).toContain("text-base");
			expect(span.attributes.class).toContain("px-4");
			expect(span.attributes.class).toContain("py-1.5");
		}
	});

	it("should combine variant and size correctly", () => {
		const jsx = (
			<MyChip variant="outlined" size="small">
				Small Outlined
			</MyChip>
		);
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		expect(spans.length).toBe(1);
		const span = spans[0];
		if (!span) {
			throw new Error("Expected span element to exist");
		}
		expect(getTextContent(span)).toBe("Small Outlined");
		if (span.type === "Element") {
			// Should have both size and variant classes
			expect(span.attributes.class).toContain("text-xs");
			expect(span.attributes.class).toContain("border");
			expect(span.attributes.class).toContain("bg-transparent");
		}
	});

	it("should render with JSX children", () => {
		const jsx = <MyChip>Bold Text</MyChip>;
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		expect(spans.length).toBe(1);
		const span = spans[0];
		if (!span) {
			throw new Error("Expected span element to exist");
		}
		if (span.type === "Element") {
			expect(span.children.length).toBeGreaterThan(0);
		}
	});

	it("should have rounded corners", () => {
		const jsx = <MyChip>Rounded</MyChip>;
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		const span = spans[0];
		if (!span) {
			throw new Error("Expected span element to exist");
		}
		if (span.type === "Element") {
			expect(span.attributes.class).toContain("rounded-full");
		}
	});

	it("should be inline-flex with centered items", () => {
		const jsx = <MyChip>Centered</MyChip>;
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		const span = spans[0];
		if (!span) {
			throw new Error("Expected span element to exist");
		}
		if (span.type === "Element") {
			expect(span.attributes.class).toContain("inline-flex");
			expect(span.attributes.class).toContain("items-center");
		}
	});
});
