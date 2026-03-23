import {db} from "../../../shared/sqlite";

export function initSchema() {
    db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  );
`);

db.query(`
    INSERT INTO users (username, password)
    SELECT 'Admin123', 'password123'
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'Admin123');
  `).run();
}