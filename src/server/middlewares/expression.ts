import session from "express-session";
import cookieParser from "cookie-parser";
import config from "../config";
import { Application } from "express";

interface Expression {
    secret: string;
    cookie: { [yerrr: string]: any };
}

export function useExpression(app: Application) {
    const expression: Expression = {
        secret: config.expression.secret,
        cookie: {},
    };
    if (process.env.NODE_ENV === "production") {
        app.set("trust proxy", 1); // trust first proxy
        expression.cookie.secure = true; // serve secure cookies
    }
    app.use(cookieParser());
    app.use(session(expression));
}
