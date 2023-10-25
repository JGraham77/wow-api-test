export interface IUser {
    access_token: string;
}

declare global {
    namespace Express {
        export interface Request {
            user: IUser;
        }
    }
}

export {};
