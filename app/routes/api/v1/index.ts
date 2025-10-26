import { type Env, Hono } from "hono";
import v from "@/middleware/validator";

const querySchema = v.schema.query({
	id: v.string().toNumber(),
});

const route = new Hono<Env>().get(
	"/",
	v.apply.query(querySchema),
	async (c) => {
		const query = v.parse.query(c, querySchema);

		if (query instanceof Error) {
			return c.text("Bad Request", 400);
		}

		return c.json({ id: query.id }, 200);
	},
);

export default route;
