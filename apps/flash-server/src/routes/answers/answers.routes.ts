import { createRoute } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { insertAnswerSchema, selectAnswersSchema } from "@flash/db";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
import { z } from "zod";
import { auth } from "../../middlewares/auth";
import { notFoundSchema, unauthorizedSchema } from "../../lib/constants";

const tags = ["Answers"];
const middleware = [auth()];

const saveAnswerRequestSchema = insertAnswerSchema.pick({
  left: true,
  right: true,
  operation: true,
  entry: true,
});
export const saveAnswer = createRoute({
  tags,
  method: "post",
  path: "/answers",
  request: {
    body: jsonContentRequired(saveAnswerRequestSchema, "Save answer request"),
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(selectAnswersSchema, "The saved answer"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(saveAnswerRequestSchema),
      "Errors when saving answer"
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: {
      description: "Unauthorized",
    },
  },
  middleware,
});

export const getAnswers = createRoute({
  tags,
  method: "get",
  path: "/answers",
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.array(selectAnswersSchema),
      "All the user's answers"
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "Unauthorized"
    ),
  },
  middleware,
});

export const getAnswer = createRoute({
  tags,
  method: "get",
  path: "/answers/{id}",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      selectAnswersSchema,
      "The requested answer"
    ),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid Id"
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "The answer is not found"
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "Unauthorized"
    ),
  },
  middleware,
});

export const recentAnswers = createRoute({
  tags,
  method: "get",
  path: "/answers/recent",
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.array(selectAnswersSchema),
      "All the user's answers"
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "Unauthorized"
    ),
  },
  middleware,
});

export const dataPointSchema = z.object({
  key: z.string().min(1),
  correct: z.number().int(),
  incorrect: z.number().int(),
});
const statsSchema = z.object({
  dataPoints: z.array(dataPointSchema),
});
const statsRequestSchema = z.object({
  range: z.enum(["month", "six-months", "yea", "all-time"]),
});
export const stats = createRoute({
  tags,
  method: "get",
  path: "/answers/stats",
  request: {
    query: statsRequestSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      statsSchema,
      "Stats for the requested range"
    ),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      statsRequestSchema,
      "Invalid stats request"
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "Unauthorized"
    ),
  },
  middleware,
});

export type SaveAnswerRoute = typeof saveAnswer;
export type GetAnswersRoute = typeof getAnswers;
export type GetAnswerRotue = typeof getAnswer;
export type RecentAnswersRotue = typeof recentAnswers;
export type StatsRoute = typeof stats;
