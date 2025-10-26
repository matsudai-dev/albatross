import { validator } from "hono/validator";
import type { HEADERS } from "./headers";
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

export function applySchemaToQuery<T extends Record<string, QuerySchema>>(
	_schema: T,
) {
	return validator("query", (value) => value as InferQuerySchema<T>);
}

export function applySchemaToParam<T extends Record<string, ParamSchema>>(
	_schema: T,
) {
	return validator("param", (value) => value as InferParamSchema<T>);
}

export function applySchemaToRequestHeader<
	T extends Partial<Record<keyof typeof HEADERS, HeaderSchema>>,
>(_schema: T) {
	return validator("header", (value) => value as InferHeaderSchema<T>);
}

export function applySchemaToRequestBodyArray<T extends ArrayElementSchema>(
	_schema: T,
) {
	try {
		return validator("json", (value) => value as InferArrayElementSchema<T>);
	} catch (_error) {
		return validator("json", (_value) => {
			return [] as unknown as InferArrayElementSchema<T>;
		});
	}
}

export function applySchemaToRequestBodyObject<
	T extends Record<string, ObjectSchema>,
>(_schema: T) {
	try {
		return validator("json", (value) => value as InferObjectSchema<T>);
	} catch (_error) {
		return validator("json", (_value) => {
			return {} as unknown as InferObjectSchema<T>;
		});
	}
}

type ReturnRequestBody<T> = T extends ArrayElementSchema
	? ReturnType<typeof applySchemaToRequestBodyArray<T>>
	: T extends Record<string, ObjectSchema>
		? ReturnType<typeof applySchemaToRequestBodyObject<T>>
		: never;

export function applySchemaToRequestBody<
	T extends ArrayElementSchema | Record<string, ObjectSchema>,
>(schema: T) {
	if (typeof schema === "object" && schema !== null && !Array.isArray(schema)) {
		return applySchemaToRequestBodyArray(
			schema as ArrayElementSchema,
		) as ReturnRequestBody<T>;
	}

	return applySchemaToRequestBodyObject(
		schema as Record<string, ObjectSchema>,
	) as ReturnRequestBody<T>;
}
