import { Hono } from "hono";
import { hc } from "hono/client";
import apiV1 from "@/routes/api/v1";
import apiV1Bird from "@/routes/api/v1/bird";

export const apiRouter = new Hono()
	.route("/api/v1", apiV1)
	.route("/api/v1/bird", apiV1Bird);

export const apiV1Client = hc<typeof apiRouter>("/").api.v1;
