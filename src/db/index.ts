import { env } from "node:process";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

const connectionString =
  env.DATABASE_URL ?? "postgres://user:password@localhost:5432/taf_africa";

const pool = new Pool({ connectionString });

export const db = drizzle({ client: pool, schema });
export { schema };
