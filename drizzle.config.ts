import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("DATABASE_URL:", process.env.DATABASE_URL);

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  driver: "pg", // Use 'pg' for PostgreSQL
  dialect: "postgresql", // Specify the dialect explicitly
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Ensure your env variable is correct
  },
} satisfies Config;
