import express from "express";

const router = express.Router();

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
                return res.status(404).json({ message: "Not a valid race", races });
            }
            fetch(
                `https://us.api.blizzard.com/data/wow/playable-race/${race.id}?namespace=static-classic-us&locale=en_US&access_token=${req.user.access_token}`
            )
                .then((res) => res.json())
                .then((data) => {
                    res.json(data);
                });
        });
});

router.get("/races", (req, res) => {
    fetch(
        `https://us.api.blizzard.com/data/wow/playable-race/index?namespace=static-classic-us&locale=en_US&access_token=${req.user.access_token}`
    )
        .then((res) => res.json())
        .then((data) => {
            res.json(data);
        });
});

router.get("/classes/:term", (req, res) => {
    fetch(
        `https://us.api.blizzard.com/data/wow/playable-class/index?namespace=static-classic-us&locale=en_US&access_token=${req.user.access_token}`
    )
        .then((res) => res.json())
        .then((data) => {
            const pClass = data.classes.find(
                // @ts-ignore
                (c) => c.name.toLowerCase().replace(" ", "") === req.params.term.toLowerCase().replace(" ", "")
            );
            //@ts-ignore
            const pClasses = data.classes.map((c) => c.name);
            if (!pClass || !pClass.name || !pClass.id) {
                return res.status(404).json({ message: "Not a valid class", pClasses });
            }
            fetch(
                `https://us.api.blizzard.com/data/wow/playable-class/${pClass.id}?namespace=static-classic-us&locale=en_US&access_token=${req.user.access_token}`
            )
                .then((res) => res.json())
                .then((data) => {
                    res.json(data);
                });
        });
});

router.get("/classes", (req, res) => {
    fetch(
        `https://us.api.blizzard.com/data/wow/playable-class/index?namespace=static-classic-us&locale=en_US&access_token=${req.user.access_token}`
    )
        .then((res) => res.json())
        .then((data) => {
            res.json(data);
        });
});

export default router;
