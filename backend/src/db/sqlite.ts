import Database from "better-sqlite3";

export const db = new Database("dbManagerApp.sqlite");

db.pragma("foreign_keys = ON");

