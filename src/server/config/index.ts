import dotenv from "dotenv";

dotenv.config();

const wowapi = {
    clientid: process.env.WOW_API_CLIENT as string,
    clientsecret: process.env.WOW_API_SECRET as string,
    scopes: process.env.WOW_API_SCOPES as string,
};

const expression = {
    secret: process.env.SESSION_SECRET as string,
};

const mysql = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_SCHEMA,
};

export default {
    wowapi,
    expression,
    mysql,
};
