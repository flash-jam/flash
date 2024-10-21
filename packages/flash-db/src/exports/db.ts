import { createClient } from "@libsql/client";
import { and, desc, eq, gt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { answers } from "../schema/answers";
import { profiles } from "../schema/profiles";
import { scores } from "../schema/scores";
import type {
  CreateAnswer,
  CreateProfile,
  CreateScore,
  UpdateProfile,
  UpdateScore,
} from "./types";
import { z } from "zod";

export function createDb(url: string, authToken?: string) {
  const client = createClient({ url, authToken });
  const db = drizzle(client, { schema: { answers, profiles, scores } });

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
export const updateProfileRequestSchema = createProfileRequestSchema.pick({
  level: true,
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
  profileId: true,
});
export const addScoreRequestSchema = z.object({
  toAdd: z.number().int(),
});

export const profileAndScoreSchema = z.object({
  profile: selectProfilesSchema,
  score: selectScoresSchema,
});

export interface DbConfig {
  createAnswersDbService(): AnswersDbService;
  createProfilesDbService(): ProfilesDbService;
  createScoresDbService(): ScoresDbService;
}

export class LibSqlDbConfig implements DbConfig {
  constructor(
    private url: string,
    private authToken?: string
  ) {}

  createAnswersDbService(): AnswersDbService {
    return new AnswersDbService(this.url, this.authToken);
  }
  createProfilesDbService(): ProfilesDbService {
    return new ProfilesDbService(this.url, this.authToken);
  }
  createScoresDbService(): ScoresDbService {
    return new ScoresDbService(this.url, this.authToken);
  }
}

abstract class DbService {
  constructor(url: string, authToken?: string) {
    this.db = createDb(url, authToken);
  }

  protected db: Db;
}

export class AnswersDbService extends DbService {
  constructor(url: string, authToken?: string) {
    super(url, authToken);
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

export class ProfilesDbService extends DbService {
  constructor(url: string, authToken?: string) {
    super(url, authToken);
  }

  async createProfile(toCreate: CreateProfile, userId: string) {
    const [profile] = await this.db
      .insert(profiles)
      .values({ ...toCreate, userId })
      .returning();

    return profile;
  }

  async saveProfile(profileId: number, updates: UpdateProfile) {
    const [profile] = await this.db
      .update(profiles)
      .set(updates)
      .where(eq(profiles.id, profileId))
      .returning();

    return profile;
  }

  async getProfileForUser(userId: string) {
    const profile = await this.db.query.profiles.findFirst({
      where: eq(profiles.userId, userId),
    });

    return profile;
  }

  async getOrCreateProfile(userId: string) {
    let profile = await this.getProfileForUser(userId);
    if (profile) return profile;

    profile = await this.createProfile({}, userId);

    return profile;
  }
}

export class ScoresDbService extends DbService {
  constructor(url: string, authToken?: string) {
    super(url, authToken);
  }

  async createScore(toCreate: CreateScore, profileId: number) {
    const [score] = await this.db
      .insert(scores)
      .values({ ...toCreate, profileId })
      .returning();

    return score;
  }

  async getScore(scoreId: number, profileId: number) {
    const score = await this.db.query.scores.findFirst({
      where: and(eq(scores.id, scoreId), eq(scores.profileId, profileId)),
    });

    return score;
  }

  async getScoreForProfile(profileId: number) {
    const score = await this.db.query.scores.findFirst({
      where: eq(scores.profileId, profileId),
    });

    return score;
  }

  async saveScore(scoreId: number, updates: UpdateScore) {
    const [score] = await this.db
      .update(scores)
      .set(updates)
      .where(eq(scores.id, scoreId))
      .returning();

    return score;
  }

  async getOrCreateScore(profileId: number) {
    return (
      (await this.getScoreForProfile(profileId)) ||
      (await this.createScore({}, profileId))
    );
  }

  async updateOrCreateScore(updates: UpdateScore, profileId: number) {
    const [score] = await this.db
      .update(scores)
      .set(updates)
      .where(eq(scores.profileId, profileId))
      .returning();

    if (score) return score;

    return this.createScore(updates, profileId);
  }

  async addScore(toAdd: number, profileId: number) {
    const score = await this.getOrCreateScore(profileId);

    return await this.updateOrCreateScore(
      { score: score.score + toAdd },
      profileId
    );
  }
}
