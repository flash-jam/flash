import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Environment } from "../env";
import type { PinoLogger } from "hono-pino";
import type { DbConfig } from "@flash/db";

export type PrintFunc = (str: string, ...rest: string[]) => void;

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    dbConfig: DbConfig;
  };
  Bindings: Environment;
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
