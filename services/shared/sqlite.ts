import { Database } from "bun:sqlite";
import path from "path";

const dbPath = path.resolve(import.meta.dir, "./data/dbManagerApp.sqlite");
console.log("DB PATH:", dbPath);

export const db = new Database(dbPath);
db.run("PRAGMA foreign_keys = ON;");