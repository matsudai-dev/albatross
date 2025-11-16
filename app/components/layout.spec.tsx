import { describe, expect, it } from "bun:test";
import { PROJECT_NAME } from "@common/consts";
import {
	getElementsByTagName,
	getTextContent,
	parseJSXElement,
} from "@/utils/html-parser";
import { MyLayout } from "./layout";

describe("MyLayout", () => {
	it("should render children inside main element", () => {
		const jsx = (
			<MyLayout>
				<div>Test Content</div>
			</MyLayout>
		);
		const root = parseJSXElement(jsx);
		const mainElements = getElementsByTagName(root, "main");

		expect(mainElements.length).toBe(1);
		const main = mainElements[0];
		if (!main) {
			throw new Error("Expected main element to exist");
		}
		const textContent = getTextContent(main);
		expect(textContent).toContain("Test Content");
	});

	it("should not render MyAppBar when showAppBar is false", () => {
		const jsx = (
			<MyLayout showAppBar={false}>
				<div>Content</div>
			</MyLayout>
		);
		const root = parseJSXElement(jsx);
		const headers = getElementsByTagName(root, "header");

		expect(headers.length).toBe(0);
	});

	it("should render MyAppBar when showAppBar is undefined (defaults to true)", () => {
		const jsx = (
			<MyLayout>
				<div>Content</div>
			</MyLayout>
		);
		const root = parseJSXElement(jsx);
		const headers = getElementsByTagName(root, "header");

		expect(headers.length).toBe(1);
	});

	it("should render MyAppBar when showAppBar is true", () => {
		const jsx = (
			<MyLayout showAppBar={true}>
				<div>Content</div>
			</MyLayout>
		);
		const root = parseJSXElement(jsx);
		const headers = getElementsByTagName(root, "header");

		expect(headers.length).toBe(1);
	});

	it("should pass default title to MyAppBar", () => {
		const jsx = (
			<MyLayout showAppBar={true}>
				<div>Content</div>
			</MyLayout>
		);
		const root = parseJSXElement(jsx);
		const h1Elements = getElementsByTagName(root, "h1");

		expect(h1Elements.length).toBe(1);
		const h1 = h1Elements[0];
		if (!h1) {
			throw new Error("Expected h1 element to exist");
		}
		expect(getTextContent(h1)).toBe(PROJECT_NAME);
	});

	it("should pass custom title to MyAppBar", () => {
		const jsx = (
			<MyLayout showAppBar={true} title="Custom Title">
				<div>Content</div>
			</MyLayout>
		);
		const root = parseJSXElement(jsx);
		const h1Elements = getElementsByTagName(root, "h1");

		expect(h1Elements.length).toBe(1);
		const h1 = h1Elements[0];
		if (!h1) {
			throw new Error("Expected h1 element to exist");
		}
		expect(getTextContent(h1)).toBe("Custom Title");
	});

	it("should render title even when showAppBar is false", () => {
		const jsx = (
			<MyLayout showAppBar={false} title="Page Title">
				<div>Content</div>
			</MyLayout>
		);
		const root = parseJSXElement(jsx);
		const titleElements = getElementsByTagName(root, "title");

		expect(titleElements.length).toBe(1);
		const title = titleElements[0];
		if (!title) {
			throw new Error("Expected title element to exist");
		}
		expect(getTextContent(title)).toBe("Page Title");
	});

	it("should render default title in document head", () => {
		const jsx = (
			<MyLayout>
				<div>Content</div>
			</MyLayout>
		);
		const root = parseJSXElement(jsx);
		const titleElements = getElementsByTagName(root, "title");

		expect(titleElements.length).toBe(1);
		const title = titleElements[0];
		if (!title) {
			throw new Error("Expected title element to exist");
		}
		expect(getTextContent(title)).toBe(PROJECT_NAME);
	});

	it("should render custom title in document head", () => {
		const jsx = (
			<MyLayout title="My Page">
				<div>Content</div>
			</MyLayout>
		);
		const root = parseJSXElement(jsx);
		const titleElements = getElementsByTagName(root, "title");

		expect(titleElements.length).toBe(1);
		const title = titleElements[0];
		if (!title) {
			throw new Error("Expected title element to exist");
		}
		expect(getTextContent(title)).toBe("My Page");
	});

	it("should render multiple child elements", () => {
		const jsx = (
			<MyLayout>
				<div>First</div>
				<div>Second</div>
			</MyLayout>
		);
		const root = parseJSXElement(jsx);
		const mainElements = getElementsByTagName(root, "main");

		const main = mainElements[0];
		if (!main) {
			throw new Error("Expected main element to exist");
		}
		const textContent = getTextContent(main);
		expect(textContent).toContain("First");
		expect(textContent).toContain("Second");
	});

	it("should include MyAppBar spacer when showAppBar is true", () => {
		const jsx = (
			<MyLayout showAppBar={true}>
				<div>Content</div>
			</MyLayout>
		);
		const root = parseJSXElement(jsx);
		const divs = getElementsByTagName(root, "div");

		// MyAppBar includes a spacer div with h-16
		const spacerDiv = divs.find(
			(div) =>
				div.type === "Element" &&
				div.attributes.class === "h-16" &&
				div.children.length === 0,
		);

		expect(spacerDiv).toBeDefined();
	});

	it("should not include spacer when showAppBar is false", () => {
		const jsx = (
			<MyLayout showAppBar={false}>
				<div>Content</div>
			</MyLayout>
		);
		const root = parseJSXElement(jsx);
		const divs = getElementsByTagName(root, "div");

		// Should not have the spacer div
		const spacerDiv = divs.find(
			(div) =>
				div.type === "Element" &&
				div.attributes.class === "h-16" &&
				div.children.length === 0,
		);

		expect(spacerDiv).toBeUndefined();
	});
});
