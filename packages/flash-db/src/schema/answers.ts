import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const answers = sqliteTable("answers", {
  id: integer("id").notNull().primaryKey(),
  left: real("left").notNull(),
  right: real("right").notNull(),
  operation: text("operation", {
    enum: ["addition", "subtraction", "multiplication", "division"],
  }).notNull(),
  entry: real("entry").notNull(),
  userId: text("user_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
