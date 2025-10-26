import { getDbClient } from "@db/client";
import { birdsTable } from "@db/schemas";
import { type Env, Hono } from "hono";
import v from "@/middleware/validator";

const reqBodySchema = v.schema.reqBody({
	latinName: v.string(),
	nameJa: v.string(),
	nameEn: v.string(),
});

const route = new Hono<Env>().post(
	"/",
	v.apply.reqBody(reqBodySchema),
	async (c) => {
		const reqBody = await v.parse.reqBody(c, reqBodySchema);
		if (reqBody instanceof Error) {
			return c.text("Bad Request", 400);
		}

		const { nameJa, latinName, nameEn } = reqBody;

		try {
			const db = getDbClient(c.env.DB);
			await db.insert(birdsTable).values({
				nameJa,
				latinName,
				nameEn,
			});
		} catch (e) {
			console.error(e);
			return c.text("Internal Server Error", 500);
		}

		return c.text("Created", 201);
	},
);

export default route;
