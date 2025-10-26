import { isFiniteNumber, isNonEmptyString } from "@common/validator";
import type { Context } from "hono";
import {
	ArrayStringSchema,
	StringSchema,
	StringToDateSchema,
	StringToNumberSchema,
} from "./classes";
import { HEADERS } from "./headers";
import type {
	ArrayElementSchema,
	HeaderSchema,
	InferArrayElementSchema,
	InferHeaderSchema,
	InferObjectSchema,
	InferParamSchema,
	InferQuerySchema,
	ObjectSchema,
	ParamSchema,
	QuerySchema,
} from "./types";

export function parseQuery<T extends Record<string, QuerySchema>>(
	c: Context,
	schema: T,
): InferQuerySchema<T> | Error {
	const query: Record<string, unknown> = {};

	try {
		for (const key in schema) {
			const schemaType = schema[key];
			const v = c.req.query(key);

			if (typeof v === "undefined") {
				throw new Error(`Query parameter "${key}" is missing`);
			}

			if (schemaType instanceof StringToNumberSchema) {
				const n = Number.parseFloat(v);

				if (!isFiniteNumber(n)) {
					throw new Error(
						`Query parameter "${key}" is not a valid number: received "${v}"`,
					);
				}

				query[key] = n;
			} else if (schemaType instanceof StringToDateSchema) {
				const d = new Date(v);

				if (Number.isNaN(d.getTime())) {
					throw new Error(
						`Query parameter "${key}" is not a valid date: received "${v}"`,
					);
				}

				query[key] = d;
			} else if (schemaType instanceof StringSchema) {
				if (!isNonEmptyString(v)) {
					throw new Error(
						`Query parameter "${key}" is not a valid string: received "${v}"`,
					);
				}

				query[key] = v;
			} else if (schemaType instanceof ArrayStringSchema) {
				const arr = v.split(",").map((item) => item.trim());

				if (!arr.every(isNonEmptyString)) {
					throw new Error(
						`Query parameter "${key}" is not a valid array of strings: received "${v}"`,
					);
				}

				query[key] = arr;
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			return error as Error;
		}

		return new Error(`Unknown error: ${String(error)}`) as Error;
	}

	return query as InferQuerySchema<T>;
}

export function parseParam<T extends Record<string, ParamSchema>>(
	c: Context,
	schema: T,
): InferParamSchema<T> | Error {
	const param: Record<string, unknown> = {};

	try {
		for (const key in schema) {
			const schemaType = schema[key];
			const v = c.req.param(key);

			if (typeof v === "undefined") {
				throw new Error(`Path parameter "${key}" is missing`);
			}

			if (schemaType instanceof StringToNumberSchema) {
				const n = Number.parseFloat(v);

				if (!isFiniteNumber(n)) {
					throw new Error(
						`Path parameter "${key}" is not a valid number: received "${v}"`,
					);
				}

				param[key] = n;
			} else if (schemaType instanceof StringToDateSchema) {
				const d = new Date(v);

				if (Number.isNaN(d.getTime())) {
					throw new Error(
						`Path parameter "${key}" is not a valid date: received "${v}"`,
					);
				}

				param[key] = d;
			} else if (schemaType instanceof StringSchema) {
				if (!isNonEmptyString(v)) {
					throw new Error(
						`Path parameter "${key}" is not a valid string: received "${v}"`,
					);
				}

				param[key] = v;
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			return error as Error;
		}

		return new Error(`Unknown error: ${String(error)}`) as Error;
	}

	return param as InferParamSchema<T>;
}

export function parseRequestHeader<
	T extends Partial<Record<keyof typeof HEADERS, HeaderSchema>>,
>(c: Context, schema: T): InferHeaderSchema<T> | Error {
	const header: Record<string, unknown> = {};

	try {
		for (const key in schema) {
			const headerKey = HEADERS[key as keyof typeof HEADERS];
			header[key] = c.req.header(headerKey);
		}
	} catch (error) {
		if (error instanceof Error) {
			return error as Error;
		}

		return new Error(`Unknown error: ${String(error)}`) as Error;
	}

	return header as InferHeaderSchema<T>;
}

type ReturnRequestBody<T> = T extends ArrayElementSchema
	? Promise<Array<InferArrayElementSchema<T>> | Error>
	: T extends Record<string, ObjectSchema>
		? InferObjectSchema<T> | Error
		: Error;

export async function parseRequestBody<
	T extends ArrayElementSchema | Record<string, ObjectSchema>,
>(c: Context, schema: T): Promise<ReturnRequestBody<T>> {
	try {
		const body = await c.req.json();

		if (schema instanceof Object && "parse" in schema) {
			if (!Array.isArray(body)) {
				return new Error(
					"Request body is not an array",
				) as ReturnRequestBody<T>;
			}

			return body as unknown as ReturnRequestBody<T>;
		}

		if (typeof schema === "object" && schema !== null) {
			const object: Record<string, unknown> = {};

			for (const key in schema) {
				if (Object.hasOwn(body, key)) {
					object[key] = body[key];
				}
			}

			return object as ReturnRequestBody<T>;
		}

		return new Error("Invalid schema for request body") as ReturnRequestBody<T>;
	} catch (error) {
		if (error instanceof Error) {
			return error as ReturnRequestBody<T>;
		}

		return new Error(`Unknown error: ${String(error)}`) as ReturnRequestBody<T>;
	}
}
