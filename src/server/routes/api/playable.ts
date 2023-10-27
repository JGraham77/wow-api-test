import express from "express";

const router = express.Router();

router.get("/races", (req, res) => {
    fetch(
        `https://us.api.blizzard.com/data/wow/playable-race/index?namespace=static-classic-us&locale=en_US&access_token=${req.user.access_token}`
    )
        .then((res) => res.json())
        .then((data) => {
            res.json({ happyGreeting: "fook u", data });
        });
});

router.get("/races/:term", (req, res) => {
    fetch(
        `https://us.api.blizzard.com/data/wow/playable-race/index?namespace=static-classic-us&locale=en_US&access_token=${req.user.access_token}`
    )
        .then((res) => res.json())
        .then((data) => {
            const race = data.races.find(
                // @ts-ignore
                (r) => r.name.toLowerCase().replace(" ", "") === req.params.term.toLowerCase().replace(" ", "")
            );
            //@ts-ignore
            const races = data.races.map((r) => r.name);
            if (!race || !race.name || !race.id) {
                return res.status(404).json({ message: "Not a valid race, fook u get it right", races });
            }
            fetch(
                `https://us.api.blizzard.com/data/wow/playable-race/${race.id}?namespace=static-classic-us&locale=en_US&access_token=${req.user.access_token}`
            )
                .then((res) => res.json())
                .then((data) => {
                    res.json({ happyGreeting: "fook u", data });
                });
        });
});

export default router;
