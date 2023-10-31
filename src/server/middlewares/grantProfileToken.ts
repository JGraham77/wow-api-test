//@ts-nocheck
const oauth2 = require("simple-oauth2");
import { RequestHandler } from "express";

class OAuthClient {
    constructor() {
        this.client = oauth2.create({
            client: {
                id: process.env.WOW_API_CLIENT,
                secret: process.env.WOW_API_SECRET,
            },
            auth: {
                tokenHost: "https://us.battle.net",
            },
        });
        this.token = null;
    }

    async getToken() {
        try {
            if (this.token === null || this.token.expired()) {
                const token = await this.client.clientCredentials.getToken();
                this.token = this.client.accessToken.create(token);
            }
            return this._reduceToken(this.token);
        } catch (err) {
            console.error(`Failed to retrieve client credentials oauth token: ${err.message}`);
            throw err;
        }
    }

    _reduceToken(token) {
        return token.token.access_token;
    }
}

const grantProfileToken: RequestHandler = async (req, res, next) => {
    try {
        const client = await new OAuthClient();
        const token = await client.getToken();
        req.user = { access_token: token };
        next();
    } catch (err) {
        res.status(401).json({ message: "No access token granted" });
        console.log(err);
    }
};

export default grantProfileToken;
