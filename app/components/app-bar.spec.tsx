import { describe, expect, it } from "bun:test";
import { PROJECT_NAME } from "@common/consts";
import {
	getElementsByTagName,
	getTextContent,
	parseJSXElement,
} from "@/utils/html-parser";
import { MyAppBar } from "./app-bar";

describe("MyAppBar", () => {
	it("should render header with title", () => {
		const jsx = <MyAppBar title={PROJECT_NAME} />;
		const root = parseJSXElement(jsx);
		const headers = getElementsByTagName(root, "header");

		expect(headers.length).toBe(1);
		const header = headers[0];
		if (!header) {
			throw new Error("Expected header element to exist");
		}

		const h1Elements = getElementsByTagName(root, "h1");
		expect(h1Elements.length).toBe(1);
		const h1 = h1Elements[0];
		if (!h1) {
			throw new Error("Expected h1 element to exist");
		}
		expect(getTextContent(h1)).toBe(PROJECT_NAME);
	});

	it("should render with custom title", () => {
		const jsx = <MyAppBar title="Custom Title" />;
		const root = parseJSXElement(jsx);
		const h1Elements = getElementsByTagName(root, "h1");

		expect(h1Elements.length).toBe(1);
		const h1 = h1Elements[0];
		if (!h1) {
			throw new Error("Expected h1 element to exist");
		}
		expect(getTextContent(h1)).toBe("Custom Title");
	});

	it("should have fixed positioning with correct height", () => {
		const jsx = <MyAppBar title="Test" />;
		const root = parseJSXElement(jsx);
		const headers = getElementsByTagName(root, "header");

		const header = headers[0];
		if (!header) {
			throw new Error("Expected header element to exist");
		}
		if (header.type === "Element") {
			expect(header.attributes.class).toContain("fixed");
			expect(header.attributes.class).toContain("top-0");
			expect(header.attributes.class).toContain("left-0");
			expect(header.attributes.class).toContain("right-0");
			expect(header.attributes.class).toContain("h-16");
		}
	});

	it("should have flex layout with centered items", () => {
		const jsx = <MyAppBar title="Test" />;
		const root = parseJSXElement(jsx);
		const headers = getElementsByTagName(root, "header");

		const header = headers[0];
		if (!header) {
			throw new Error("Expected header element to exist");
		}
		if (header.type === "Element") {
			expect(header.attributes.class).toContain("flex");
			expect(header.attributes.class).toContain("items-center");
		}
	});

	it("should have background and shadow styles", () => {
		const jsx = <MyAppBar title="Test" />;
		const root = parseJSXElement(jsx);
		const headers = getElementsByTagName(root, "header");

		const header = headers[0];
		if (!header) {
			throw new Error("Expected header element to exist");
		}
		if (header.type === "Element") {
			expect(header.attributes.class).toContain("bg-white");
			expect(header.attributes.class).toContain("dark:bg-gray-800");
			expect(header.attributes.class).toContain("shadow-md");
		}
	});

	it("should render prepend content when provided", () => {
		const jsx = <MyAppBar title="Test" prepend={<span>Left Content</span>} />;
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		const hasLeftContent = spans.some(
			(span) => getTextContent(span) === "Left Content",
		);
		expect(hasLeftContent).toBe(true);
	});

	it("should not render prepend div when prepend is undefined", () => {
		const jsx = <MyAppBar title="Test" />;
		const root = parseJSXElement(jsx);
		const headers = getElementsByTagName(root, "header");

		const header = headers[0];
		if (!header) {
			throw new Error("Expected header element to exist");
		}
		if (header.type === "Element") {
			// Should only have h1 as child (no prepend div)
			const divChildren = header.children.filter(
				(child) => child.type === "Element" && child.tagName === "div",
			);
			// Only the spacer div should exist, not prepend div
			expect(divChildren.length).toBe(0);
		}
	});

	it("should render append content when provided", () => {
		const jsx = <MyAppBar title="Test" append={<span>Right Content</span>} />;
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		const hasRightContent = spans.some(
			(span) => getTextContent(span) === "Right Content",
		);
		expect(hasRightContent).toBe(true);
	});

	it("should render both prepend and append content", () => {
		const jsx = (
			<MyAppBar
				prepend={<span>Left</span>}
				append={<span>Right</span>}
				title="Center"
			/>
		);
		const root = parseJSXElement(jsx);
		const spans = getElementsByTagName(root, "span");

		const hasLeft = spans.some((span) => getTextContent(span) === "Left");
		const hasRight = spans.some((span) => getTextContent(span) === "Right");

		expect(hasLeft).toBe(true);
		expect(hasRight).toBe(true);

		const h1Elements = getElementsByTagName(root, "h1");
		const h1 = h1Elements[0];
		if (!h1) {
			throw new Error("Expected h1 element to exist");
		}
		expect(getTextContent(h1)).toBe("Center");
	});

	it("should have flex-1 on h1 for flexible width", () => {
		const jsx = <MyAppBar title="Test" />;
		const root = parseJSXElement(jsx);
		const h1Elements = getElementsByTagName(root, "h1");

		const h1 = h1Elements[0];
		if (!h1) {
			throw new Error("Expected h1 element to exist");
		}
		if (h1.type === "Element") {
			expect(h1.attributes.class).toContain("flex-1");
		}
	});

	it("should render spacer div with h-16", () => {
		const jsx = <MyAppBar title="Test" />;
		const root = parseJSXElement(jsx);
		const divs = getElementsByTagName(root, "div");

		// Find the spacer div (should be after header)
		const spacerDiv = divs.find(
			(div) =>
				div.type === "Element" &&
				div.attributes.class === "h-16" &&
				div.children.length === 0,
		);

		expect(spacerDiv).toBeDefined();
	});

	it("should wrap prepend content in div with ml-5", () => {
		const jsx = <MyAppBar title="Test" prepend={<span>Left</span>} />;
		const root = parseJSXElement(jsx);
		const headers = getElementsByTagName(root, "header");

		const header = headers[0];
		if (!header) {
			throw new Error("Expected header element to exist");
		}
		if (header.type === "Element") {
			const prependDiv = header.children.find(
				(child) =>
					child.type === "Element" &&
					child.tagName === "div" &&
					typeof child.attributes.class === "string" &&
					child.attributes.class.includes("ml-5"),
			);
			expect(prependDiv).toBeDefined();
		}
	});

	it("should wrap append content in div with mr-5", () => {
		const jsx = <MyAppBar title="Test" append={<span>Right</span>} />;
		const root = parseJSXElement(jsx);
		const headers = getElementsByTagName(root, "header");

		const header = headers[0];
		if (!header) {
			throw new Error("Expected header element to exist");
		}
		if (header.type === "Element") {
			const appendDiv = header.children.find(
				(child) =>
					child.type === "Element" &&
					child.tagName === "div" &&
					typeof child.attributes.class === "string" &&
					child.attributes.class.includes("mr-5"),
			);
			expect(appendDiv).toBeDefined();
		}
	});

	it("should handle string prepend content", () => {
		const jsx = <MyAppBar title="Test" prepend="Left Text" />;
		const root = parseJSXElement(jsx);
		const headers = getElementsByTagName(root, "header");

		const header = headers[0];
		if (!header) {
			throw new Error("Expected header element to exist");
		}
		const textContent = getTextContent(header);
		expect(textContent).toContain("Left Text");
	});

	it("should handle string append content", () => {
		const jsx = <MyAppBar title="Test" append="Right Text" />;
		const root = parseJSXElement(jsx);
		const headers = getElementsByTagName(root, "header");

		const header = headers[0];
		if (!header) {
			throw new Error("Expected header element to exist");
		}
		const textContent = getTextContent(header);
		expect(textContent).toContain("Right Text");
	});
});
