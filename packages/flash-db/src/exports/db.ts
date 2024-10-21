import { createClient } from "@libsql/client";
import { and, desc, eq, gt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { profiles } from "@/schema/profiles";
import { answers } from "@/schema/answers";
import { scores } from "@/schema/scores";

export function createDb(url: string, authToken?: string) {
  const client = createClient({ url, authToken });
  const db = drizzle(client, { schema: { answers } });

  return db;
}

export type Db = ReturnType<typeof createDb>;

export const selectAnswersSchema = createSelectSchema(answers);
export const insertAnswerSchema = createInsertSchema(answers);
export const createAnswerRequestSchema = insertAnswerSchema.omit({
  userId: true,
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectProfilesSchema = createSelectSchema(profiles);
export const insertProfileSchema = createInsertSchema(profiles);
export const createProfileRequestSchema = insertProfileSchema.omit({
  userId: true,
});

export const selectScoresSchema = createSelectSchema(scores);
export const insertScoreSchema = createInsertSchema(scores);
export const updateScoreRequestSchema = insertScoreSchema
  .pick({
    score: true,
  })
  .required();
export const createScoreRequestSchema = insertScoreSchema.omit({
  id: true,
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
              gt(answers.updatedAt, range),
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
