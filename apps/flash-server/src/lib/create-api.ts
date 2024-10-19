import { clerkMiddleware } from "@hono/clerk-auth";
import type { AppOpenAPI } from "./types";
import health from "../routes/health/health.route";
import answers from "../routes/answers/answers.index";

export function createApi(app: AppOpenAPI) {
  app.use("/api/*", clerkMiddleware());

  return app.route("/api", health).route("/api", answers);
}
