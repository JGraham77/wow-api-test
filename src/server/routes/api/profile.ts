import express from "express";
import grantProfileToken from "../../middlewares/grantProfileToken";

const router = express.Router();

router.get("/", grantProfileToken, async (req, res) => {
    fetch(
        `https://us.api.blizzard.com/profile/wow/character/atiesh/moontooth/character-media?namespace=profile-classic-us&locale=en_US&access_token=${req.user.access_token}`
    ).then(async (fetchres) => {
        const data = await fetchres.json();
        res.status(404).json({ message: "could not fetch profile at this time", data });
    });
});

export default router;
