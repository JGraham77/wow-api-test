import express from "express";
import searchRoute from "./search";
import playableRoute from "./playable";
import profileRoute from "./profile";

const router = express.Router();

router.use("/search", searchRoute);
router.use("/playable", playableRoute);
router.use("/profile", profileRoute);

router.get("/test", (req, res) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    fetch("https://oauth.battle.net/oauth/check_token", {
        headers,
        method: "POST",
        body: `token=${req.user.access_token}`,
    })
        .then((res) => res.json())
        .then((data) => res.json(data));
});

export default router;
