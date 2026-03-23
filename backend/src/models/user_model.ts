//backend/src/models/user_model.ts

import {db} from "../db/sqlite";

export class UserModel{

    validateCredentials(username: string, password: string): boolean {
        
        const stmt = db.query(`
            SELECT id, username, password FROM users WHERE username = ?`
        );
        const user = stmt.get(username) as User | undefined;

        if(!user) {
            return false;
        }

        if( password != user.password) {
            return false;
        }

        return true;
    }
}

export type User = {
    id: number;
    name: string;
    password: string;
}
