import { OpenAPIHono } from "@hono/zod-openapi";

import { LibSqlDbConfig } from "@flash/db";
import onError from "stoker/middlewares/on-error";
import serveEmojiFavicon from "stoker/middlewares/serve-emoji-favicon";
import defaultHook from "stoker/openapi/default-hook";
import { getEnv } from "../env";
import { pinoLogger } from "../middlewares/pino-logger";
import type { AppBindings, AppOpenAPI } from "./types";
import { cors } from "hono/cors";
import { notFound } from "stoker/middlewares";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();

  app.use(async (c, next) => {
    c.env = getEnv(c.env);
    await next();
  });

  app.use(pinoLogger());

  app.use((c, next) => {
    const corsMiddleware = cors({
      origin: c.env.CORS,
      credentials: true,
    });
    return corsMiddleware(c, next);
  });

  app.use(async (c, next) => {
    c.set(
      "dbConfig",
      new LibSqlDbConfig(c.env.DATABASE_URL, c.env.DATABASE_AUTH_TOKEN),
    );

    await next();
  });

  app.use(serveEmojiFavicon("⚡"));

  app.notFound(notFound);
  app.onError(onError);

  return app;
}

export function createTestApp(router: AppOpenAPI) {
  const testApp = createApp();
  testApp.route("/", router);
  return testApp;
}
