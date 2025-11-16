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

	test("renders with checked prop", () => {
		const root = parseJSXElement(<MySwitch checked={true} />);
		const inputs = getElementsByTagName(root, "input");

		const input = inputs[0];
		if (!input) throw new Error("Expected input element to exist");

		if (input.type === "Element") {
			expect(input.attributes.checked).toBe(true);
		}
	});

	test("renders with unchecked prop", () => {
		const root = parseJSXElement(<MySwitch checked={false} />);
		const inputs = getElementsByTagName(root, "input");

		const input = inputs[0];
		if (!input) throw new Error("Expected input element to exist");

		if (input.type === "Element") {
			// checked={false} is typically omitted from HTML attributes
			// The presence of the input without checked attribute indicates unchecked state
			expect(input.attributes.checked).toBeUndefined();
		}
	});

	test("renders without checked prop defaults to undefined", () => {
		const root = parseJSXElement(<MySwitch />);
		const inputs = getElementsByTagName(root, "input");

		const input = inputs[0];
		if (!input) throw new Error("Expected input element to exist");

		if (input.type === "Element") {
			expect(input.attributes.checked).toBeUndefined();
		}
	});

	test("supports controlled component with checked prop", () => {
		// Test that checked prop can be passed (for controlled components)
		const rootChecked = parseJSXElement(<MySwitch checked={true} />);
		const inputsChecked = getElementsByTagName(rootChecked, "input");
		const inputChecked = inputsChecked[0];

		if (!inputChecked) throw new Error("Expected input element to exist");
		if (inputChecked.type === "Element") {
			expect(inputChecked.attributes.checked).toBe(true);
		}

		const rootUnchecked = parseJSXElement(<MySwitch checked={false} />);
		const inputsUnchecked = getElementsByTagName(rootUnchecked, "input");
		const inputUnchecked = inputsUnchecked[0];

		if (!inputUnchecked) throw new Error("Expected input element to exist");
		if (inputUnchecked.type === "Element") {
			// In HTML, checked={false} typically doesn't render the attribute
			expect(
				inputUnchecked.attributes.checked === undefined ||
					inputUnchecked.attributes.checked === false,
			).toBe(true);
		}
	});

	test("accepts onChange prop for controlled component", () => {
		// Test that onChange prop can be passed without errors
		const handleChange = (_checked: boolean) => {
			// Mock handler - in actual runtime this would be called
		};

		// This should not throw an error
		const root = parseJSXElement(<MySwitch onChange={handleChange} />);
		const inputs = getElementsByTagName(root, "input");

		expect(inputs.length).toBe(1);
		const input = inputs[0];
		if (!input) throw new Error("Expected input element to exist");
	});
});
