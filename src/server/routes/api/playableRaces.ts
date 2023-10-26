import express from "express";

const router = express.Router();

router.get("/races", (req, res) => {
    fetch(
        `https://us.api.blizzard.com/data/wow/playable-race/index?namespace=static-classic-us&locale=en_US&access_token=${req.user.access_token}`
    );
});

export default router;
