import { createRoute } from "@hono/zod-openapi";
import { auth } from "../../middlewares/auth";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import {
  createScoreRequestSchema,
  selectScoresSchema,
  updateScoreRequestSchema,
} from "@flash/db";
import * as HTTP from "stoker/http-status-codes";
import { createErrorSchema } from "stoker/openapi/schemas";

const tags = ["Scores"];
const middlewares = [auth()];

export const createScore = createRoute({
  tags,
  method: "post",
  middlewares,
  path: "/scores",
  request: {
    body: jsonContentRequired(createScoreRequestSchema, "The score request"),
  },
  responses: {
    [HTTP.OK]: jsonContent(selectScoresSchema, "The created score"),
    [HTTP.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(createScoreRequestSchema),
      "Invalid create score request",
    ),
  },
});

export type CreateScoreRoute = typeof createScore;

export const getScoreForUser = createRoute({
  tags,
  method: "get",
  middlewares,
  path: "/scores/foruser",
  responses: {
    [HTTP.OK]: jsonContent(selectScoresSchema, "The user's score"),
    [HTTP.UNAUTHORIZED]: {
      description: "Unauthorized",
    },
  },
});

export type GetScoreForUserRoute = typeof getScoreForUser;

export const saveScore = createRoute({
  tags,
  method: "patch",
  middlewares,
  path: "/scores",
  request: {
    body: jsonContentRequired(
      updateScoreRequestSchema,
      "The update score request",
    ),
  },
  responses: {
    [HTTP.OK]: jsonContent(selectScoresSchema, "The updated score"),
    [HTTP.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(updateScoreRequestSchema),
      "Invalid udpate score request",
    ),
    [HTTP.UNAUTHORIZED]: {
      description: "Unauthorized",
    },
  },
});

export type SaveScoreRoute = typeof saveScore;