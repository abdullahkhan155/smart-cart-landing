import Database from "better-sqlite3"
import path from "path"
import fs from "fs"
import os from "os"

function getDbPath() {
  const configuredDir = process.env.DEMO_DB_DIR || process.env.DEMO_DATA_DIR
  if (configuredDir) return path.join(configuredDir, "demo.db")

  // Serverless file systems (e.g. Vercel) are read-only except for /tmp.
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "smart-cart-landing", "demo.db")
  }

  return path.join(process.cwd(), "data", "demo.db")
}

const dbPath = getDbPath()

// Ensure database and table exist
function getDb() {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
  const db = new Database(dbPath)
  db.pragma("journal_mode = WAL")
  db.exec(`
    CREATE TABLE IF NOT EXISTS demo_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      company_name TEXT,
      email TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `)

  const columns = db.prepare("PRAGMA table_info(demo_requests)").all() as Array<{ name: string }>
  const hasCompanyName = columns.some((column) => column.name === "company_name")
  if (!hasCompanyName) {
    db.exec("ALTER TABLE demo_requests ADD COLUMN company_name TEXT")
  }

  return db
}

export async function saveDemoRequest(fullName: string, email: string, companyName?: string) {
  const db = getDb()
  const stmt = db.prepare(
    "INSERT INTO demo_requests (full_name, company_name, email, created_at) VALUES (?, ?, ?, datetime('now'))"
  )
  stmt.run(fullName, companyName?.trim() || null, email)
}

export type DemoRequestPayload = {
  fullName: string
  companyName?: string
  email: string
}
