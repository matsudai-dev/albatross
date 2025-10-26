import type { HEADERS } from "./headers";
import type {
	HeaderSchema,
	ObjectSchema,
	ParamSchema,
	QuerySchema,
} from "./types";

export function createQuerySchema<T extends Record<string, QuerySchema>>(
	schema: T,
): T {
	return schema;
}

export function createParamSchema<T extends Record<string, ParamSchema>>(
	schema: T,
): T {
	return schema;
}

export function createHeaderSchema<
	T extends Partial<Record<keyof typeof HEADERS, HeaderSchema>>,
>(schema: T): T {
	return schema;
}

export function createBodySchema<T extends Record<string, ObjectSchema>>(
	schema: T,
): T {
	return schema;
}
