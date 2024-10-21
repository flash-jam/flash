import type {
  createAnswerRequestSchema,
  selectAnswersSchema,
  selectProfilesSchema,
  createProfileRequestSchema,
  selectScoresSchema,
  createScoreRequestSchema,
  updateScoreRequestSchema,
} from "@/exports/db";
import type { z } from "zod";

export type Answer = z.infer<typeof selectAnswersSchema>;
export type Operation = Answer["operation"];
export type CreateAnswer = z.infer<typeof createAnswerRequestSchema>;

export type Profile = z.infer<typeof selectProfilesSchema>;
export type CreateProfile = z.infer<typeof createProfileRequestSchema>;

export type Score = z.infer<typeof selectScoresSchema>;
export type CreateScore = z.infer<typeof createScoreRequestSchema>;
export type UpdateScore = z.infer<typeof updateScoreRequestSchema>;
