import { defineConfig } from "drizzle-kit";
import { getEnv } from "./env";

const env = getEnv(process.env);

export default defineConfig({
  schema: "./src/schema/*",
  out: "./src/migrations",
  dialect: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
});
