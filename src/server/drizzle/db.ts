import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from '../../../drizzle/schema'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = drizzle(pool, { schema })