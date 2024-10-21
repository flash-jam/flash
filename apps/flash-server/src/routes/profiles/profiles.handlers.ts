import * as HTTP from "stoker/http-status-codes";
import * as Phrases from "stoker/http-status-phrases";
import { getProfilesDb } from "../../lib/get-db";
import { getValidAuth } from "../../lib/get-valid-auth";
import type { AppRouteHandler } from "../../lib/types";
import type {
  CreateProfileRoute,
  GetProfileForUserRoute,
  UpdateProfileRoute,
} from "./profiles.routes";

export const createProfile: AppRouteHandler<CreateProfileRoute> = async (c) => {
  const createProfileRequest = c.req.valid("json");
  const db = getProfilesDb(c);
  const auth = getValidAuth(c);

  const profile = await db.createProfile(createProfileRequest, auth.userId);
  return c.json(profile, HTTP.OK);
};

export const getProfileForUser: AppRouteHandler<
  GetProfileForUserRoute
> = async (c) => {
  const { userId } = getValidAuth(c);
  const db = getProfilesDb(c);

  const profile = db.getOrCreateProfile(userId);

  if (!profile) return c.json({ message: Phrases.NOT_FOUND }, HTTP.NOT_FOUND);

  return c.json(profile, HTTP.OK);
};

export const updateProfile: AppRouteHandler<UpdateProfileRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  const db = getProfilesDb(c);

  const profile = await db.saveProfile(id, updates);

  if (!profile) return c.json({ message: Phrases.NOT_FOUND }, HTTP.NOT_FOUND);

  return c.json(profile, HTTP.OK);
};
