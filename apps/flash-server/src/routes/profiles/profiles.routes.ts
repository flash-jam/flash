import {
  createProfileRequestSchema,
  selectProfilesSchema,
  updateProfileRequestSchema,
} from "@flash/db";
import { createRoute } from "@hono/zod-openapi";
import {
  jsonContent,
  jsonContentOneOf,
  jsonContentRequired,
} from "stoker/openapi/helpers";
import * as HTTP from "stoker/http-status-codes";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
import { notFoundSchema } from "../../lib/constants";
import { auth } from "../../middlewares/auth";

const tags = ["Profiles"];
const middleware = [auth()];

export const createProfile = createRoute({
  tags,
  method: "post",
  middleware,
  path: "/profiles",
  request: {
    body: jsonContentRequired(
      createProfileRequestSchema,
      "Create Profile request",
    ),
  },
  responses: {
    [HTTP.OK]: jsonContent(selectProfilesSchema, "The created profile"),
    [HTTP.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(createProfileRequestSchema),
      "Errors when creating a profile",
    ),
    [HTTP.UNAUTHORIZED]: {
      description: "Unauthorized",
    },
  },
});

export type CreateProfileRoute = typeof createProfile;

export const getProfileForUser = createRoute({
  tags,
  method: "post",
  middleware,
  path: "/profiles/foruser",
  responses: {
    [HTTP.OK]: jsonContent(selectProfilesSchema, "The User profile"),
    [HTTP.NOT_FOUND]: jsonContent(notFoundSchema, "The profile is not found"),
    [HTTP.UNAUTHORIZED]: {
      description: "Unauthorized",
    },
  },
});

export type GetProfileForUserRoute = typeof getProfileForUser;

export const updateProfile = createRoute({
  tags,
  method: "patch",
  path: "/profiles/{id}",
  middleware,
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      updateProfileRequestSchema,
      "Update profile request",
    ),
  },
  responses: {
    [HTTP.OK]: jsonContent(selectProfilesSchema, "The updated profile"),
    [HTTP.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        createErrorSchema(IdParamsSchema),
        createErrorSchema(updateProfileRequestSchema),
      ],
      "Update profile validation errors",
    ),
    [HTTP.NOT_FOUND]: jsonContent(notFoundSchema, "Profile not found"),
    [HTTP.UNAUTHORIZED]: {
      description: "Unauthorized",
    },
  },
});

export type UpdateProfileRoute = typeof updateProfile;
