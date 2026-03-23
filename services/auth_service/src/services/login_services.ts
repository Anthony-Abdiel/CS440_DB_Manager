import type { User, UserRepo } from "../repos/users_repo";


export class LoginService {
    constructor(private repo: UserRepo) {}
    
    validateCredentials(username: string, password: string): boolean {
        const user = this.repo.findByUsername(username);

        if(!user) {
            return false;
        }

        if( password != user.password) {
            return false;
        }

        return true;
    }
}