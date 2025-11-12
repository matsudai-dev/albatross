export interface StartTagToken {
	type: "StartTag";
	tagName: string;
	attributes: Record<string, string | boolean>;
}

export interface EndTagToken {
	type: "EndTag";
	tagName: string;
}

export interface TextToken {
	type: "Text";
	content: string;
}

export interface CommentToken {
	type: "Comment";
	content: string;
}

export type AnyToken = StartTagToken | EndTagToken | TextToken | CommentToken;

export interface ElementNode {
	type: "Element";
	tagName: string;
	attributes: Record<string, string | boolean>;
	children: Array<AnyNode>;
}

export interface TextNode {
	type: "Text";
	content: string;
}

export interface CommentNode {
	type: "Comment";
	content: string;
}

export type AnyNode = ElementNode | TextNode | CommentNode;
