import "dotenv/config";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

// Postgres connection for Neon (serverless). Uses a small pool.
export const sql = postgres(connectionString!, {
  max: 4,
  idle_timeout: 20,
  connect_timeout: 10,
});

export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY DEFAULT ('u_' || gen_random_uuid()::text),
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'STUDENT',
      password TEXT NOT NULL,
      grade INTEGER,
      parent_name TEXT,
      parent_phone TEXT,
      phone TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      points INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id TEXT PRIMARY KEY DEFAULT ('qr_' || gen_random_uuid()::text),
      user_id TEXT NOT NULL,
      quiz_id TEXT NOT NULL,
      score INTEGER NOT NULL DEFAULT 0,
      total INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS student_progress (
      id TEXT PRIMARY KEY DEFAULT ('sp_' || gen_random_uuid()::text),
      user_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}
