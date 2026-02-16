export type User = {
    id: number;
    name: string;
    password: string;
}

export interface UserRepo {
    findByUsername(userName: string) : User | undefined;
}