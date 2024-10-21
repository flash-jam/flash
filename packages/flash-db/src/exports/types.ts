import type { z } from "zod";
import type {
  selectAnswersSchema,
  createAnswerRequestSchema,
  selectProfilesSchema,
  createProfileRequestSchema,
  selectScoresSchema,
  createScoreRequestSchema,
  updateScoreRequestSchema,
  updateProfileRequestSchema,
  addScoreRequestSchema,
  profileAndScoreSchema,
} from "./db";

export type Answer = z.infer<typeof selectAnswersSchema>;
export type Operation = Answer["operation"];
export type CreateAnswer = z.infer<typeof createAnswerRequestSchema>;

export type Profile = z.infer<typeof selectProfilesSchema>;
export type CreateProfile = z.infer<typeof createProfileRequestSchema>;
export type UpdateProfile = z.infer<typeof updateProfileRequestSchema>;

export type Score = z.infer<typeof selectScoresSchema>;
export type CreateScore = z.infer<typeof createScoreRequestSchema>;
export type UpdateScore = z.infer<typeof updateScoreRequestSchema>;
export type AddToScore = z.infer<typeof addScoreRequestSchema>;

export type ResetScore = z.infer<typeof profileAndScoreSchema>;
