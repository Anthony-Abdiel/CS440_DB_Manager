import {db} from "../../db/sqlite";
import type {User, UserRepo} from "../users_repo";

export class SqliteUserRepo implements UserRepo {
    findByUsername(username: string): User | undefined {
        const stmt = db.prepare(`
            SELECT id, username, password FROM users WHERE username = ?`
        );
        const success = stmt.get(username) as User | undefined;

        return success;
    }
}