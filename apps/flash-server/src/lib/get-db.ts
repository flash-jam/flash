import type { AppBindings } from "./types";
import type { Context } from "hono";

export function getAnswersDb(c: Context<AppBindings>) {
  return c.var.dbConfig.createAnswersDbService();
}

export function getProfilesDb(c: Context<AppBindings>) {
  return c.var.dbConfig.createProfilesDbService();
}

export function getScoresDb(c: Context<AppBindings>) {
  return c.var.dbConfig.createScoresDbService();
}
