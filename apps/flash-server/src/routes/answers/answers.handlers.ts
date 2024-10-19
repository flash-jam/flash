import * as HTTPStatusCodes from "stoker/http-status-codes";
import * as HTTPStatusPhrases from "stoker/http-status-phrases";
import type { z } from "zod";
import type { AppRouteHandler } from "../../lib/types";
import { getDb } from "../../lib/get-db";
import { getValidAuth } from "../../lib/get-valid-auth";
import type {
  dataPointSchema,
  GetAnswerRotue,
  GetAnswersRoute,
  RecentAnswersRotue,
  SaveAnswerRoute,
  StatsRoute,
} from "./answers.routes";
import { isCorrect } from "../../lib/utils";

export const saveAnswers: AppRouteHandler<SaveAnswerRoute> = async (c) => {
  const answerRequest = c.req.valid("json");
  const db = getDb(c.env);
  const auth = getValidAuth(c);

  const answer = await db.saveAnswer(answerRequest, auth.userId);
  return c.json(answer, HTTPStatusCodes.OK);
};

export const getAnswers: AppRouteHandler<GetAnswersRoute> = async (c) => {
  const db = getDb(c.env);
  const { userId } = getValidAuth(c);

  const results = await db.getAnswers(userId);

  return c.json(results, HTTPStatusCodes.OK);
};

export const getAnswer: AppRouteHandler<GetAnswerRotue> = async (c) => {
  const { id } = c.req.valid("param");
  const db = getDb(c.env);
  const { userId } = getValidAuth(c);

  const answer = await db.getAnswer(userId, id);

  if (!answer)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND
    );

  return c.json(answer, HTTPStatusCodes.OK);
};

export const recentAnswers: AppRouteHandler<RecentAnswersRotue> = async (c) => {
  const db = getDb(c.env);
  const { userId } = getValidAuth(c);

  const results = await db.getRecentAnswers(userId, 20);

  return c.json(results, HTTPStatusCodes.OK);
};

const THRITY_DAYS = 1000 * 60 * 60 * 24 * 30;
const SIX_MONTHS = THRITY_DAYS * 6;
const YEAR = SIX_MONTHS * 2;
const DAY = 1000 * 60 * 60 * 24;

type DataPoint = z.infer<typeof dataPointSchema>;

export const stats: AppRouteHandler<StatsRoute> = async (c) => {
  const query = c.req.query();
  const db = getDb(c.env);
  const { userId } = getValidAuth(c);

  const range =
    query.range === "month"
      ? new Date(Date.now() - THRITY_DAYS)
      : query.range === "six-months"
        ? new Date(Date.now() - SIX_MONTHS)
        : query.range === "year"
          ? new Date(Date.now() - YEAR)
          : new Date(Date.now() + DAY);

  const results = await db.getStats(userId, range);

  const formatOptions: Intl.DateTimeFormatOptions | null = [
    "month",
    "six-months",
    "year",
    "all-time",
  ].includes(query.range)
    ? { month: "short" }
    : null;

  if (formatOptions) {
    const dataPoints = results.reduce((list, a) => {
      let dataPoint = list.find(
        (d) => d.key === a.createdAt.toLocaleString("en-US", formatOptions)
      );
      if (!dataPoint) {
        const correct = isCorrect(a);
        dataPoint = {
          key: a.createdAt.toLocaleString("en-US", formatOptions),
          correct: correct ? 1 : 0,
          incorrect: correct ? 0 : 1,
        };
        list.push(dataPoint);
      } else {
        if (isCorrect(a)) {
          dataPoint.correct += 1;
        } else {
          dataPoint.incorrect += 1;
        }
      }
      return list;
    }, [] as DataPoint[]);

    return c.json({ dataPoints }, HTTPStatusCodes.OK);
  }

  return c.json(
    {
      dataPoints: [
        {
          key: "Today",
          correct: results.filter((a) => isCorrect(a)).length,
          incorrect: results.filter((a) => !isCorrect(a)).length,
        },
      ],
    },
    HTTPStatusCodes.OK
  );
};
