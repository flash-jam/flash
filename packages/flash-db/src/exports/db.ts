import { createClient } from "@libsql/client";
import { and, desc, eq, gt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { answers } from "../schema/answers";
import type { CreateAnswer } from "./types";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export function createDb(url: string, authToken?: string) {
  const client = createClient({ url, authToken });
  const db = drizzle(client, { schema: { answers } });

  return db;
}

export type Db = ReturnType<typeof createDb>;

export const selectAnswersSchema = createSelectSchema(answers);
export const insertAnswerSchema = createInsertSchema(answers);
export const requestsSchema = insertAnswerSchema.omit({
  userId: true,
  id: true,
  createdAt: true,
  updatedAt: true,
});

export class DbService {
  private db: Db;

  constructor(url: string, authToken?: string) {
    this.db = createDb(url, authToken);
  }

  async getAnswers(userId: string) {
    return await this.db.query.answers.findMany({
      where: eq(answers.userId, userId),
    });
  }

  async getAnswer(userId: string, id: number) {
    return await this.db.query.answers.findFirst({
      where: and(eq(answers.userId, userId), eq(answers.id, id)),
    });
  }

  async getRecentAnswers(userId: string, top: number) {
    const results = await this.db.query.answers.findMany({
      where: eq(answers.userId, userId),
      limit: top,
      orderBy: desc(answers.createdAt),
    });

    return results;
  }

  async getStats(userId: string, range: Date) {
    const results =
      range.getTime() > Date.now()
        ? await this.db.query.answers.findMany({
            where: eq(answers.userId, userId),
          })
        : await this.db.query.answers.findMany({
            where: and(
              eq(answers.userId, userId),
              gt(answers.updatedAt, range)
            ),
          });

    return results;
  }

  async saveAnswer(toCreate: CreateAnswer, userId: string) {
    const [answer] = await this.db
      .insert(answers)
      .values({ ...toCreate, userId })
      .returning();

    return answer;
  }
}
