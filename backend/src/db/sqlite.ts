// src/db/sqlite.ts
import { Database } from "bun:sqlite";

export const db = new Database("dbManagerApp.sqlite");
db.run("PRAGMA foreign_keys = ON;");
