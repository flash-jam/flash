import type { Context } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { InvalidAuthException } from "./exceptions";
import type { AppBindings } from "./types";

export function getValidAuth(c: Context<AppBindings>) {
  const auth = getAuth(c);

  if (!auth?.userId) throw new InvalidAuthException();

  return auth!;
}
