import type { MiddlewareHandler } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { UnauthorizedException } from "../lib/exceptions";
import type { AppBindings } from "../lib/types";

export function auth() {
  return (async (c, next) => {
    const auth = getAuth(c);

    if (!auth?.userId) throw new UnauthorizedException();

    return await next();
  }) satisfies MiddlewareHandler<AppBindings>;
}
