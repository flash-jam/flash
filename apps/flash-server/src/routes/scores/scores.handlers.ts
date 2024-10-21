import { getProfilesDb, getScoresDb } from "../../lib/get-db";
import { getValidAuth } from "../../lib/get-valid-auth";
import type { AppRouteHandler } from "../../lib/types";
import type {
  CreateScoreRoute,
  GetScoreForUserRoute,
  SaveScoreRoute,
} from "./scores.routes";
import * as HTTP from "stoker/http-status-codes";

export const createScore: AppRouteHandler<CreateScoreRoute> = async (c) => {
  const createScoreRequest = c.req.valid("json");
  const { userId } = getValidAuth(c);
  const profiles = getProfilesDb(c);
  const scores = getScoresDb(c);

  const profile = await profiles.getOrCreateProfile(userId);
  const score = await scores.createScore(createScoreRequest, profile.id);

  return c.json(score, HTTP.OK);
};

export const getScoreForUser: AppRouteHandler<GetScoreForUserRoute> = async (
  c,
) => {
  const { userId } = getValidAuth(c);
  const profiles = getProfilesDb(c);
  const scores = getScoresDb(c);

  const profile = await profiles.getOrCreateProfile(userId);
  const score = await scores.getOrCreateScore(profile.id);

  return c.json(score, HTTP.OK);
};

export const saveScore: AppRouteHandler<SaveScoreRoute> = async (c) => {
  const saveScoreRequest = c.req.valid("json");
  const { userId } = getValidAuth(c);
  const profiles = getProfilesDb(c);
  const scores = getScoresDb(c);

  const profile = await profiles.getOrCreateProfile(userId);
  const score = await scores.updateOrCreateScore(saveScoreRequest, profile.id);

  return c.json(score, HTTP.OK);
};
