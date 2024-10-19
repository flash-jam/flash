import { OpenAPIHono } from "@hono/zod-openapi";

import notFound from "stoker/middlewares/not-found";

import onError from "stoker/middlewares/on-error";
import serveEmojiFavicon from "stoker/middlewares/serve-emoji-favicon";
import defaultHook from "stoker/openapi/default-hook";
import type { AppBindings, AppOpenAPI } from "./types";
import { getEnv } from "../env";
import { pinoLogger } from "../middlewares/pino-logger";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();

  app.use((c, next) => {
    c.env = getEnv(c.env);
    return next();
  });

  app.use(serveEmojiFavicon("⚡"));
  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}

export function createTestApp(router: AppOpenAPI) {
  const testApp = createApp();
  testApp.route("/", router);
  return testApp;
}
