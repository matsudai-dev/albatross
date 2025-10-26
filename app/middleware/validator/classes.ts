export abstract class Schema<T> {
	declare readonly _output: T;
}

export class StringToNumberSchema extends Schema<number> {
	declare readonly _type: "stringToNumber";
}

export class StringToDateSchema extends Schema<Date> {
	declare readonly _type: "stringToDate";
}

export class StringSchema extends Schema<string> {
	declare readonly _type: "string";

	toNumber() {
		return new StringToNumberSchema();
	}

	toDate() {
		return new StringToDateSchema();
	}
}

export class NumberSchema extends Schema<number> {
	declare readonly _type: "number";
}

export class ArrayStringSchema extends Schema<Array<string>> {
	declare readonly _type: "arrayString";
}
