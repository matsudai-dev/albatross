import { describe, expect, it } from "bun:test";
import { isFiniteNumber, isNonEmptyString } from "./validator";

describe("isFiniteNumber", () => {
	it("should return true for finite numbers", () => {
		expect(isFiniteNumber(0)).toBe(true);
		expect(isFiniteNumber(123)).toBe(true);
		expect(isFiniteNumber(-45.67)).toBe(true);
		expect(isFiniteNumber(Number.MAX_SAFE_INTEGER)).toBe(true);
	});

	it("should return false for non-finite numbers", () => {
		expect(isFiniteNumber(Infinity)).toBe(false);
		expect(isFiniteNumber(-Infinity)).toBe(false);
		expect(isFiniteNumber(NaN)).toBe(false);
	});

	it("should return false for non-number types", () => {
		expect(isFiniteNumber("123")).toBe(false);
		expect(isFiniteNumber("hello")).toBe(false);
		expect(isFiniteNumber(null)).toBe(false);
		expect(isFiniteNumber(undefined)).toBe(false);
		expect(isFiniteNumber({})).toBe(false);
		expect(isFiniteNumber([])).toBe(false);
		expect(isFiniteNumber(true)).toBe(false);
	});
});

describe("isNonEmptyString", () => {
	it("should return true for non-empty strings", () => {
		expect(isNonEmptyString("hello")).toBe(true);
		expect(isNonEmptyString(" a ")).toBe(true);
		expect(isNonEmptyString("123")).toBe(true);
	});

	it("should return false for an empty string", () => {
		expect(isNonEmptyString("")).toBe(false);
	});

	it("should return false for non-string types", () => {
		expect(isNonEmptyString(123)).toBe(false);
		expect(isNonEmptyString(null)).toBe(false);
		expect(isNonEmptyString(undefined)).toBe(false);
		expect(isNonEmptyString({})).toBe(false);
		expect(isNonEmptyString([])).toBe(false);
		expect(isNonEmptyString(true)).toBe(false);
	});
});
