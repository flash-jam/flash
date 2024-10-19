import { DbService } from "@flash/db";
import type { Environment } from "../env";

export function getDb(env: Environment) {
  const db = new DbService(env.DATABASE_URL, env.DATABASE_AUTH_TOKEN);

  return db;
}
