import { describe, expect, test } from "bun:test";
import {
	getElementsByAttribute,
	getElementsByTagName,
	parseJSXElement,
} from "@/utils/html-parser";
import { MySwitch } from "./switch";

describe("MySwitch", () => {
	test("renders label with checkbox input", () => {
		const root = parseJSXElement(<MySwitch />);
		const labels = getElementsByTagName(root, "label");

		expect(labels.length).toBe(1);
		const label = labels[0];
		if (!label) throw new Error("Expected label element to exist");

		const inputs = getElementsByTagName(root, "input");
		expect(inputs.length).toBe(1);
		const input = inputs[0];
		if (!input) throw new Error("Expected input element to exist");

		if (input.type === "Element") {
			expect(input.attributes.type).toBe("checkbox");
		}
	});

	test("applies cursor-pointer to label", () => {
		const root = parseJSXElement(<MySwitch />);
		const labels = getElementsByTagName(root, "label");

		const label = labels[0];
		if (!label) throw new Error("Expected label element to exist");

		if (label.type === "Element") {
			expect(label.attributes.class).toContain("cursor-pointer");
		}
	});

	test("checkbox has sr-only class for accessibility", () => {
		const root = parseJSXElement(<MySwitch />);
		const inputs = getElementsByTagName(root, "input");

		const input = inputs[0];
		if (!input) throw new Error("Expected input element to exist");

		if (input.type === "Element") {
			expect(input.attributes.class).toContain("sr-only");
		}
	});

	test("renders toggle switch div element", () => {
		const root = parseJSXElement(<MySwitch />);
		const divs = getElementsByTagName(root, "div");

		expect(divs.length).toBeGreaterThan(0);
		const toggleDiv = divs[0];
		if (!toggleDiv) throw new Error("Expected div element to exist");

		if (toggleDiv.type === "Element") {
			expect(toggleDiv.attributes.class).toContain("w-11");
			expect(toggleDiv.attributes.class).toContain("h-6");
			expect(toggleDiv.attributes.class).toContain("rounded-full");
		}
	});

	test("renders prepend element when provided", () => {
		const root = parseJSXElement(
			<MySwitch prepend={<span class="prepend-test">Left</span>} />,
		);
		const spans = getElementsByAttribute(root, "class", "prepend-test");

		expect(spans.length).toBe(1);
		const span = spans[0];
		if (!span) throw new Error("Expected prepend span to exist");
	});

	test("renders append element when provided", () => {
		const root = parseJSXElement(
			<MySwitch append={<span class="append-test">Right</span>} />,
		);
		const spans = getElementsByAttribute(root, "class", "append-test");

		expect(spans.length).toBe(1);
		const span = spans[0];
		if (!span) throw new Error("Expected append span to exist");
	});

	test("renders both prepend and append elements", () => {
		const root = parseJSXElement(
			<MySwitch
				prepend={<span class="prepend-icon">P</span>}
				append={<span class="append-icon">A</span>}
			/>,
		);

		const prependSpans = getElementsByAttribute(root, "class", "prepend-icon");
		const appendSpans = getElementsByAttribute(root, "class", "append-icon");

		expect(prependSpans.length).toBe(1);
		expect(appendSpans.length).toBe(1);

		if (!prependSpans[0]) throw new Error("Expected prepend span to exist");
		if (!appendSpans[0]) throw new Error("Expected append span to exist");
	});

	test("applies flex layout for proper alignment", () => {
		const root = parseJSXElement(<MySwitch />);
		const labels = getElementsByTagName(root, "label");

		const label = labels[0];
		if (!label) throw new Error("Expected label element to exist");

		if (label.type === "Element") {
			expect(label.attributes.class).toContain("inline-flex");
			expect(label.attributes.class).toContain("items-center");
			expect(label.attributes.class).toContain("gap-2");
		}
	});

	test("toggle switch has peer class for state management", () => {
		const root = parseJSXElement(<MySwitch />);
		const inputs = getElementsByTagName(root, "input");

		const input = inputs[0];
		if (!input) throw new Error("Expected input element to exist");

		if (input.type === "Element") {
			expect(input.attributes.class).toContain("peer");
		}
	});

	test("toggle switch has checked state styling", () => {
		const root = parseJSXElement(<MySwitch />);
		const divs = getElementsByTagName(root, "div");

		const toggleDiv = divs[0];
		if (!toggleDiv) throw new Error("Expected div element to exist");

		if (toggleDiv.type === "Element") {
			expect(toggleDiv.attributes.class).toContain("peer-checked:bg-blue-600");
			expect(toggleDiv.attributes.class).toContain(
				"peer-checked:after:translate-x-full",
			);
		}
	});
});
