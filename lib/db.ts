import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const globalForDb = globalThis as unknown as { nexusDb?: DatabaseSync };

function databasePath() {
  return process.env.DATABASE_PATH || path.join(process.cwd(), "data", "nexus.sqlite");
}

export function getDb() {
  if (!globalForDb.nexusDb) {
    const file = databasePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const db = new DatabaseSync(file);
    db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT,
        name TEXT NOT NULL,
        provider TEXT NOT NULL DEFAULT 'password',
        provider_id TEXT,
        plan TEXT NOT NULL DEFAULT 'starter',
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token_hash TEXT NOT NULL UNIQUE,
        expires_at INTEGER NOT NULL,
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS usage_counters (
        subject_key TEXT NOT NULL,
        period TEXT NOT NULL,
        kind TEXT NOT NULL,
        count INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (subject_key, period, kind)
      );

      CREATE TABLE IF NOT EXISTS rate_limits (
        bucket TEXT PRIMARY KEY,
        window_start INTEGER NOT NULL,
        count INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        company TEXT NOT NULL,
        email TEXT NOT NULL,
        inquiry_type TEXT NOT NULL,
        message TEXT NOT NULL,
        locale TEXT NOT NULL,
        created_at INTEGER NOT NULL
      );

      CREATE INDEX IF NOT EXISTS sessions_user_id ON sessions(user_id);
      CREATE UNIQUE INDEX IF NOT EXISTS users_provider_identity
        ON users(provider, provider_id)
        WHERE provider_id IS NOT NULL;
    `);
    globalForDb.nexusDb = db;
  }
  return globalForDb.nexusDb;
}

export type UserRow = {
  id: string;
  email: string;
  password_hash: string | null;
  name: string;
  provider: string;
  provider_id: string | null;
  plan: string;
  created_at: number;
};

export type LeadRow = {
  id: string;
  name: string;
  company: string;
  email: string;
  inquiry_type: string;
  message: string;
  locale: string;
  created_at: number;
};
