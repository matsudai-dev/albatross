import type { JSX } from "hono/jsx/jsx-runtime";
import type { AnyNode, AnyToken, ElementNode } from "./types";

/** Converts an HTML string into an array of tokens. */
export function tokenize(html: string): Array<AnyToken> {
	const tokens: Array<AnyToken> = [];
	let i = 0;

	const tagStart = /^<([a-zA-Z0-9]+)/; // e.g., <div
	const tagEnd = /^\s*(\/?)>/; // e.g., > or />
	const attribute =
		/^\s*([a-zA-Z0-9\-_:]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/; // e.g., class="foo"
	const endTag = /^<\/([a-zA-Z0-9]+)>/; // e.g., </div>
	const comment = /^<!--([\s\S]*?)-->/; // e.g., <!-- comment -->

	while (i < html.length) {
		const remaining = html.substring(i);

		// 1. Comment
		const commentMatch = remaining.match(comment);
		if (commentMatch?.[1]) {
			tokens.push({
				type: "Comment",
				content: commentMatch[1],
			});
			i += commentMatch[0].length;
			continue;
		}

		// 2. End tag
		const endTagMatch = remaining.match(endTag);
		if (endTagMatch?.[1]) {
			tokens.push({
				type: "EndTag",
				tagName: endTagMatch[1],
			});
			i += endTagMatch[0].length;
			continue;
		}

		// 3. Start tag
		if (remaining.startsWith("<")) {
			const tagStartMatch = remaining.match(tagStart);
			if (tagStartMatch?.[1]) {
				let j = tagStartMatch[0].length;
				const tagName = tagStartMatch[1];
				const attributes: Record<string, string | boolean> = {};

				while (j < remaining.length) {
					const attrSlice = remaining.substring(j);
					const attrMatch = attrSlice.match(attribute);
					if (attrMatch?.[1]) {
						const name = attrMatch[1];
						const value = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4];
						attributes[name] = value === undefined ? true : value;
						j += attrMatch[0].length;
					} else {
						break;
					}
				}

				const tagEndMatch = remaining.substring(j).match(tagEnd);
				if (tagEndMatch) {
					tokens.push({
						type: "StartTag",
						tagName,
						attributes,
					});
					i += j + tagEndMatch[0].length;
					continue;
				}
			}
		}

		// 4. Text node
		const nextTagStart = remaining.indexOf("<");
		const textEnd = nextTagStart === -1 ? remaining.length : nextTagStart;
		const textContent = remaining.substring(0, textEnd);

		if (textContent.trim().length > 0) {
			tokens.push({
				type: "Text",
				content: textContent,
			});
		}
		i += textEnd;
	}

	return tokens;
}

/** Builds a node tree from an array of tokens. */
export function parse(tokens: Array<AnyToken>): AnyNode {
	const root: ElementNode = {
		type: "Element",
		tagName: "root",
		attributes: {},
		children: [],
	};

	const stack: Array<ElementNode> = [root];
	const selfClosingTags = new Set([
		"area",
		"base",
		"br",
		"col",
		"embed",
		"hr",
		"img",
		"input",
		"link",
		"meta",
		"param",
		"source",
		"track",
		"wbr",
	]);

	for (const token of tokens) {
		const parent = stack[stack.length - 1];

		if (!parent) {
			continue;
		}

		switch (token.type) {
			case "StartTag": {
				const elementNode: ElementNode = {
					type: "Element",
					tagName: token.tagName,
					attributes: token.attributes,
					children: [],
				};
				parent.children.push(elementNode);
				stack.push(elementNode);
				if (selfClosingTags.has(token.tagName)) {
					stack.pop(); // Remove self-closing tags from the stack immediately
				}
				break;
			}
			case "EndTag": {
				if (stack.length > 1) {
					stack.pop();
				}
				break;
			}
			case "Text": {
				parent.children.push({
					type: "Text",
					content: token.content,
				});
				break;
			}
			case "Comment": {
				parent.children.push({
					type: "Comment",
					content: token.content,
				});
				break;
			}
		}
	}

	return root;
}

/** Parses a JSX element into a node tree. */
export function parseJSXElement(jsx: JSX.Element): AnyNode {
	const tokens = tokenize(jsx.toString());
	return parse(tokens);
}

/** Gets all descendant elements with the specified tag name. */
export function getElementsByTagName(
	node: AnyNode,
	tagName: string,
): Array<ElementNode> {
	const results: Array<ElementNode> = [];

	function traverse(currentNode: AnyNode) {
		if (currentNode.type === "Element" && currentNode.tagName === tagName) {
			results.push(currentNode);
		}

		if ("children" in currentNode && currentNode.children) {
			for (const child of currentNode.children) {
				traverse(child);
			}
		}
	}

	traverse(node);
	return results;
}

/** Gets elements with the specified attribute. */
export function getElementsByAttribute(
	node: AnyNode,
	attributeName: string,
	attributeValue?: string,
): Array<ElementNode> {
	const results: Array<ElementNode> = [];

	function traverse(currentNode: AnyNode) {
		if (currentNode.type === "Element") {
			const hasAttribute = Object.hasOwn(currentNode.attributes, attributeName);

			if (hasAttribute) {
				if (attributeValue === undefined) {
					results.push(currentNode);
				} else {
					if (currentNode.attributes[attributeName] === attributeValue) {
						results.push(currentNode);
					}
				}
			}
		}

		if ("children" in currentNode && currentNode.children) {
			for (const child of currentNode.children) {
				traverse(child);
			}
		}
	}

	traverse(node);
	return results;
}

/** Concatenates and retrieves all text content from a node and its descendants. */
export function getTextContent(node: AnyNode): string {
	if (node.type === "Text") {
		return node.content;
	}

	if (node.type === "Comment") {
		return "";
	}

	if ("children" in node && node.children) {
		return node.children.map(getTextContent).join("");
	}

	return "";
}
