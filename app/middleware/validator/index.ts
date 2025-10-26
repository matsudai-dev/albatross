import {
	applySchemaToParam,
	applySchemaToQuery,
	applySchemaToRequestBody,
	applySchemaToRequestHeader,
} from "./appliers";
import { ArrayStringSchema, NumberSchema, StringSchema } from "./classes";
import {
	parseParam,
	parseQuery,
	parseRequestBody,
	parseRequestHeader,
} from "./parsers";
import {
	createBodySchema,
	createHeaderSchema,
	createParamSchema,
	createQuerySchema,
} from "./schemas";

export default {
	schema: {
		query: createQuerySchema,
		param: createParamSchema,
		reqHeader: createHeaderSchema,
		reqBody: createBodySchema,
	},
	apply: {
		query: applySchemaToQuery,
		param: applySchemaToParam,
		reqHeader: applySchemaToRequestHeader,
		reqBody: applySchemaToRequestBody,
	},
	parse: {
		query: parseQuery,
		param: parseParam,
		reqHeader: parseRequestHeader,
		reqBody: parseRequestBody,
	},
	string: () => new StringSchema(),
	number: () => new NumberSchema(),
	arrayString: () => new ArrayStringSchema(),
};
