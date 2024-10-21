import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { profiles } from "./profiles";

export const scores = sqliteTable("scores", {
  id: integer("id").primaryKey(),
  profileId: integer("profile_id")
    .notNull()
    .references(() => profiles.id),
  score: integer("score").notNull().default(0),
});
