import { createRoute } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { createRouter } from "../../lib/create-app";
import { auth } from "../../middlewares/auth";

const health = createRouter().openapi(
  createRoute({
    tags: ["Health"],
    method: "get",
    path: "/health",
    responses: {
      [HTTPStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Tasks API"),
        "Tasks API Index"
      ),
      [HTTPStatusCodes.UNAUTHORIZED]: {
        description: "Not authorized",
      },
    },
    middleware: [auth()],
  }),
  (c) => c.json({ message: "healthy" }, HTTPStatusCodes.OK)
);

export default health;
