import { describe, expect, it } from "bun:test";
import {
	getElementsByAttribute,
	getElementsByTagName,
	parse,
	parseJSXElement,
	tokenize,
} from ".";

describe("tokenize", () => {
	it("should tokenize a simple element with text", () => {
		const html = "<p>Hello World</p>";
		const tokens = tokenize(html);
		expect(tokens).toEqual([
			{ type: "StartTag", tagName: "p", attributes: {} },
			{ type: "Text", content: "Hello World" },
			{ type: "EndTag", tagName: "p" },
		]);
	});

	it("should tokenize an element with attributes", () => {
		const html = `<a href="/home" class='link'>Click me</a>`;
		const tokens = tokenize(html);
		expect(tokens).toEqual([
			{
				type: "StartTag",
				tagName: "a",
				attributes: { href: "/home", class: "link" },
			},
			{ type: "Text", content: "Click me" },
			{ type: "EndTag", tagName: "a" },
		]);
	});

	it("should handle self-closing tags", () => {
		const html = `<img src="image.png" />`;
		const tokens = tokenize(html);
		expect(tokens).toEqual([
			{
				type: "StartTag",
				tagName: "img",
				attributes: { src: "image.png" },
			},
		]);
	});

	it("should handle boolean attributes", () => {
		const html = "<button disabled>Submit</button>";
		const tokens = tokenize(html);
		expect(tokens).toEqual([
			{ type: "StartTag", tagName: "button", attributes: { disabled: true } },
			{ type: "Text", content: "Submit" },
			{ type: "EndTag", tagName: "button" },
		]);
	});

	it("should tokenize comments", () => {
		const html = "<!-- This is a comment -->";
		const tokens = tokenize(html);
		expect(tokens).toEqual([
			{ type: "Comment", content: " This is a comment " },
		]);
	});

	it("should tokenize a complex nested structure", () => {
		const html = `<div><h1>Title</h1><p>Text and <!-- comment --> here.</p></div>`;
		const tokens = tokenize(html);
		expect(tokens).toEqual([
			{ type: "StartTag", tagName: "div", attributes: {} },
			{ type: "StartTag", tagName: "h1", attributes: {} },
			{ type: "Text", content: "Title" },
			{ type: "EndTag", tagName: "h1" },
			{ type: "StartTag", tagName: "p", attributes: {} },
			{ type: "Text", content: "Text and " },
			{ type: "Comment", content: " comment " },
			{ type: "Text", content: " here." },
			{ type: "EndTag", tagName: "p" },
			{ type: "EndTag", tagName: "div" },
		]);
	});

	it("should handle text nodes outside of any tags", () => {
		const html = "before<p>inside</p>after";
		const tokens = tokenize(html);
		expect(tokens).toEqual([
			{ type: "Text", content: "before" },
			{ type: "StartTag", tagName: "p", attributes: {} },
			{ type: "Text", content: "inside" },
			{ type: "EndTag", tagName: "p" },
			{ type: "Text", content: "after" },
		]);
	});
});

describe("parse", () => {
	it("should parse a simple structure", () => {
		const html = "<p>Hello</p>";
		const tokens = tokenize(html);
		const tree = parse(tokens);

		expect(tree).toEqual({
			type: "Element",
			tagName: "root",
			attributes: {},
			children: [
				{
					type: "Element",
					tagName: "p",
					attributes: {},
					children: [{ type: "Text", content: "Hello" }],
				},
			],
		});
	});

	it("should parse nested elements", () => {
		const html = "<div><span>Text</span></div>";
		const tokens = tokenize(html);
		const tree = parse(tokens);

		expect(tree).toEqual({
			type: "Element",
			tagName: "root",
			attributes: {},
			children: [
				{
					type: "Element",
					tagName: "div",
					attributes: {},
					children: [
						{
							type: "Element",
							tagName: "span",
							attributes: {},
							children: [{ type: "Text", content: "Text" }],
						},
					],
				},
			],
		});
	});

	it("should parse self-closing tags correctly in a structure", () => {
		const html = "<div><img src='test.jpg' /><p>Text</p></div>";
		const tokens = tokenize(html);
		const tree = parse(tokens);

		expect(tree).toEqual({
			type: "Element",
			tagName: "root",
			attributes: {},
			children: [
				{
					type: "Element",
					tagName: "div",
					attributes: {},
					children: [
						{
							type: "Element",
							tagName: "img",
							attributes: { src: "test.jpg" },
							children: [],
						},
						{
							type: "Element",
							tagName: "p",
							attributes: {},
							children: [{ type: "Text", content: "Text" }],
						},
					],
				},
			],
		});
	});

	it("should handle comments", () => {
		const html = "<div><!-- comment --></div>";
		const tokens = tokenize(html);
		const tree = parse(tokens);

		expect(tree).toEqual({
			type: "Element",
			tagName: "root",
			attributes: {},
			children: [
				{
					type: "Element",
					tagName: "div",
					attributes: {},
					children: [{ type: "Comment", content: " comment " }],
				},
			],
		});
	});
});

describe("getElementsByTagName", () => {
	it("should find a single element by tag name", () => {
		const jsx = (
			<div>
				<p>Hello</p>
			</div>
		);
		const root = parseJSXElement(jsx);
		const elements = getElementsByTagName(root, "p");
		expect(elements.length).toBe(1);
		expect(elements[0]?.tagName).toBe("p");
	});

	it("should find multiple elements by tag name", () => {
		const jsx = (
			<div>
				<p>One</p>
				<span>
					<p>Two</p>
				</span>
			</div>
		);
		const root = parseJSXElement(jsx);
		const elements = getElementsByTagName(root, "p");
		expect(elements.length).toBe(2);
		expect(elements[0]?.tagName).toBe("p");
		expect(elements[1]?.tagName).toBe("p");
	});

	it("should return an empty array if no elements are found", () => {
		const jsx = (
			<div>
				<p>Hello</p>
			</div>
		);
		const root = parseJSXElement(jsx);
		const elements = getElementsByTagName(root, "span");
		expect(elements.length).toBe(0);
	});

	it("should find deeply nested elements", () => {
		const jsx = (
			<body>
				<main>
					<div>
						<section>
							<h1>Title</h1>
						</section>
					</div>
				</main>
			</body>
		);
		const root = parseJSXElement(jsx);
		const elements = getElementsByTagName(root, "h1");
		expect(elements.length).toBe(1);
		expect(elements[0]?.tagName).toBe("h1");
	});

	it("should start search from a sub-node", () => {
		const jsx = (
			<>
				<div id="one">
					<p>Paragraph 1</p>
				</div>
				<div id="two">
					<p>Paragraph 2</p>
				</div>
			</>
		);
		const root = parseJSXElement(jsx);
		const divTwo = getElementsByTagName(root, "div")[1];
		if (!divTwo) {
			throw new Error("No div with index 1 found");
		}
		const paragraphs = getElementsByTagName(divTwo, "p");
		expect(paragraphs.length).toBe(1);
		expect(paragraphs[0]?.children[0]?.type).toBe("Text");
		if (paragraphs[0]?.children[0]?.type === "Text") {
			expect(paragraphs[0].children[0].content.trim()).toBe("Paragraph 2");
		}
	});
});

describe("getElementsByAttribute", () => {
	it("should find elements by attribute name", () => {
		const jsx = (
			<>
				<div data-testid="first">First</div>
				<p data-testid="second">Second</p>
				<span>No testid here</span>
			</>
		);
		const root = parseJSXElement(jsx);
		const elements = getElementsByAttribute(root, "data-testid");
		expect(elements.length).toBe(2);
		expect(elements[0]?.tagName).toBe("div");
		expect(elements[1]?.tagName).toBe("p");
	});

	it("should find elements by attribute name and value", () => {
		const jsx = (
			<>
				<div data-testid="item">Item 1</div>
				<p data-testid="item">Item 2</p>
				<div data-testid="other">Other</div>
			</>
		);
		const root = parseJSXElement(jsx);
		const elements = getElementsByAttribute(root, "data-testid", "item");
		expect(elements.length).toBe(2);
		expect(elements[0]?.tagName).toBe("div");
		expect(elements[1]?.tagName).toBe("p");
	});

	it("should return an empty array if no elements match the attribute name", () => {
		const jsx = <div class="container"></div>;
		const root = parseJSXElement(jsx);
		const elements = getElementsByAttribute(root, "id");
		expect(elements.length).toBe(0);
	});

	it("should return an empty array if no elements match the attribute value", () => {
		const jsx = <div data-testid="item"></div>;
		const root = parseJSXElement(jsx);
		const elements = getElementsByAttribute(
			root,
			"data-testid",
			"non-existent",
		);
		expect(elements.length).toBe(0);
	});

	it("should handle boolean attributes", () => {
		const jsx = (
			<>
				<button type="button" disabled>
					Click
				</button>
				<button type="button">Cancel</button>
			</>
		);
		const root = parseJSXElement(jsx);
		const elements = getElementsByAttribute(root, "disabled");
		expect(elements.length).toBe(1);
		expect(elements[0]?.tagName).toBe("button");
		expect(elements[0]?.attributes.disabled).toBe(true);
	});
});
