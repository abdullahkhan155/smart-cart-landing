import Database from "better-sqlite3"
import path from "path"
import fs from "fs"

const dbPath = path.join(process.cwd(), "data", "demo.db")

// Ensure database and table exist
function getDb() {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
  const db = new Database(dbPath)
  db.pragma("journal_mode = WAL")
  db.exec(`
    CREATE TABLE IF NOT EXISTS demo_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `)
  return db
}

export async function saveDemoRequest(fullName: string, email: string) {
  const db = getDb()
  const stmt = db.prepare(
    "INSERT INTO demo_requests (full_name, email, created_at) VALUES (?, ?, datetime('now'))"
  )
  stmt.run(fullName, email)
}

export type DemoRequestPayload = {
  fullName: string
  email: string
}
