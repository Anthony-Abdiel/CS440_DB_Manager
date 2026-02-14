import {db} from "./sqlite";

export function initSchema() {
    db.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  );
`);

db.prepare(`
    INSERT INTO users (username, password)
    SELECT 'Admin123', 'password123'
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'Admin123');
  `).run();
}