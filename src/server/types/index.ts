declare global {
    namespace Express {
        export interface User {
            id: string;
            battletag: string;
        }
    }
}

interface Token {}

export {};