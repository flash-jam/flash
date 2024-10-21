import { getProfilesDb, getScoresDb } from "../../lib/get-db";
import { getValidAuth } from "../../lib/get-valid-auth";
import type { AppRouteHandler } from "../../lib/types";
import type {
  AddScoreRoute,
  CreateScoreRoute,
  GetScoreForUserRoute,
  ResetScoreRoute,
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
  c
) => {
  const { userId } = getValidAuth(c);
  const profiles = getProfilesDb(c);
  const scores = getScoresDb(c);

  const profile = await profiles.getOrCreateProfile(userId);
  const score = await scores.getOrCreateScore(profile.id);

  c.var.logger.info("Got score:", { score });

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

export const addScore: AppRouteHandler<AddScoreRoute> = async (c) => {
  const addScoreReqeuest = c.req.valid("json");
  const { userId } = getValidAuth(c);
  const profiles = getProfilesDb(c);
  const scores = getScoresDb(c);

  let profile = await profiles.getOrCreateProfile(userId);
  let score = await scores.getOrCreateScore(profile.id);

  score = await scores.updateOrCreateScore(
    { score: score.score + addScoreReqeuest.toAdd },
    profile.id
  );

  if (score.score >= profile.level * 10) {
    profile = await profiles.saveProfile(profile.id, {
      level: profile.level + 1,
    });
  }

  return c.json({ profile, score }, HTTP.OK);
};

export const resetScore: AppRouteHandler<ResetScoreRoute> = async (c) => {
  const { userId } = getValidAuth(c);
  const profiles = getProfilesDb(c);
  const scores = getScoresDb(c);

  let profile = await profiles.getOrCreateProfile(userId);
  profile = await profiles.saveProfile(profile.id, { level: 1 });

  let score = await scores.getOrCreateScore(profile.id);

  if (score.score > 0) {
    score = await scores.updateOrCreateScore({ score: 0 }, profile.id);
  }

  return c.json({ profile, score }, HTTP.OK);
};
