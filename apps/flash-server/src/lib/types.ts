import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Environment } from "../env";

export type PrintFunc = (str: string, ...rest: string[]) => void;

export interface AppBindings {
  Variables: {
    logger: PrintFunc;
  };
  Bindings: Environment;
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
