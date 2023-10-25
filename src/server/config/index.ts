import dotenv from "dotenv";

dotenv.config();

const wowapi = {
    BNET_ID: process.env.WOW_API_CLIENT as string,
    BNET_SECRET: process.env.WOW_API_SECRET as string,
};

const mysql = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_SCHEMA,
};

export default {
    wowapi,
    mysql,
};
