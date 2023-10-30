import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    fetch(
        `https://us.api.blizzard.com/profile/user/wow?namespace=profile-classic-us&locale=en_US&access_token=${req.user.access_token}`
    )
        .then(async (fetchres) => {
            if (fetchres.ok) {
                return fetchres.json();
            } else {
                res.status(404).json({ message: "could not fetch profile at this time" });
            }
        })
        .then((data) => {
            res.json(data);
        });
});

export default router;
