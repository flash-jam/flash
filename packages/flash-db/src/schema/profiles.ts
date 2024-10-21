import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey(),
  userId: text("user_id").notNull(),
  level: integer("level")
    .notNull()
    .$defaultFn(() => 1),
});
