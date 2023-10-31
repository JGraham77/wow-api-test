import { RequestHandler } from "express";
import config from "../config";

const { BNET_ID: username, BNET_SECRET: password } = config.wowapi;

const grantAccessToken: RequestHandler = async (req, res, next) => {
    const headers = new Headers();
    headers.set("Authorization", "Basic " + Buffer.from(username + ":" + password).toString("base64"));
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    const f_res = await fetch("https://oauth.battle.net/token", {
        headers,
        method: "POST",
        body: "grant_type=client_credentials&scope=wow.profile",
    });

    const data = await f_res.json();

    if ("access_token" in data) {
        req.user = {
            access_token: data.access_token,
        };
        next();
    } else {
        res.status(401).json({ message: "No access token granted" });
        return;
    }
};

export default grantAccessToken;
