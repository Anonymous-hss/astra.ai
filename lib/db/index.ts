import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Initialize Neon client with connection string from environment variable
const sql = neon(process.env.DATABASE_URL!);

// Initialize Drizzle ORM with the Neon client and schema
export const db = drizzle(sql, { schema });
