import type { z } from "zod";
import type { requestsSchema, selectAnswersSchema } from "./db";

export type Answer = z.infer<typeof selectAnswersSchema>;
export type Operation = Answer["operation"];
export type CreateAnswer = z.infer<typeof requestsSchema>;