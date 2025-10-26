import type {
	ArrayStringSchema,
	NumberSchema,
	Schema,
	StringSchema,
	StringToDateSchema,
	StringToNumberSchema,
} from "./classes";

/** A schema for validating a URL query parameter. */
export type QuerySchema =
	| StringToNumberSchema
	| StringToDateSchema
	| StringSchema
	| ArrayStringSchema;

/** A schema for validating a URL path parameter. */
export type ParamSchema =
	| StringToNumberSchema
	| StringToDateSchema
	| StringSchema;

/** A schema for validating a request header. */
export type HeaderSchema = StringSchema;

/** A schema for validating a request body array element. */
export type ArrayElementSchema = StringSchema | NumberSchema;

/** A schema for validating a request body object property. */
export type ObjectSchema = StringSchema | NumberSchema | ArrayStringSchema;

type Infer<T> = T extends Schema<infer U> ? U : never;

/** Infer the output types from a set of query schemas. */
export type InferQuerySchema<T extends Record<string, QuerySchema>> = {
	[K in keyof T]: Infer<T[K]>;
} & {};

/** Infer the output types from a set of path parameter schemas. */
export type InferParamSchema<T extends Record<string, ParamSchema>> = {
	[K in keyof T]: Infer<T[K]>;
} & {};

/** Infer the output types from a set of header schemas. */
export type InferHeaderSchema<T extends Record<string, HeaderSchema>> = {
	[K in keyof T]: Infer<T[K]>;
} & {};

/** Infer the output type from an array element schema. */
export type InferArrayElementSchema<T extends ArrayElementSchema> =
	T extends StringSchema ? string : T extends NumberSchema ? number : never;

/** Infer the output types from a set of object property schemas. */
export type InferObjectSchema<T extends Record<string, ObjectSchema>> = {
	[K in keyof T]: Infer<T[K]>;
} & {};
