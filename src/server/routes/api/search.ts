import express from "express";

const router = express.Router();

router.get("/creatures", (req, res) => {
    const pageSize = req.query.pageSize || 20;
    const page = req.query.page || 1;
    const creature = req.query.creature ? `&name.en_US=${req.query.creature}` : "";

    fetch(
        `https://us.api.blizzard.com/data/wow/search/creature?namespace=static-us&orderby=id${creature}&_page=${page}&_pageSize=${pageSize}&access_token=${req.user.access_token}`
    )
        .then((res) => res.json())
        .then((data) => {
            res.json(data);
        });
});

router.get("/items", (req, res) => {
    const pageSize = req.query.pageSize || 20;
    const page = req.query.page || 1;
    const item = req.query.item ? `&name.en_US=${req.query.item}` : "";

    fetch(
        `https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&orderby=id${item}&_page=${page}&_pageSize=${pageSize}&access_token=${req.user.access_token}`
    )
        .then((res) => res.json())
        .then((data) => {
            res.json(data);
        });
});

router.get("/media", (req, res) => {
    const pageSize = req.query.pageSize || 20;
    const page = req.query.page || 1;
    const tag = req.query.tag ? `&tag=${req.query.tag}` : "";
    const tagArray = [
        "achievement",
        "creature-display",
        "creature-family",
        "guild-crest",
        "item",
        "keystone-affix",
        "pet",
        "pet-ability",
        "playable-class",
        "playable-specialization",
        "profession",
        "pvp-tier",
        "spell",
    ];
    if (tag && !tagArray.includes(req.query.tag as string)) {
        return res.status(404).json({ message: "Not a valid tag", tagArray });
    }

    // This should work, but blizzard's api is dumb
    // My issue: https://us.forums.blizzard.com/en/blizzard/t/guild-crest-media-tag-fetches-nothing/47800
    // Related issue: https://us.forums.blizzard.com/en/blizzard/t/guild-crest-emblem-media-image-urls-are-broken/2731/1
    if (req.query.tag === "guild-crest") {
        return res.status(404).json({ message: "get bodied by blizzard, fook u" });
    }

    fetch(
        `https://us.api.blizzard.com/data/wow/search/media?namespace=static-us${tag}&orderby=id&_page=${page}&_pageSize=${pageSize}&access_token=${req.user.access_token}`
    )
        .then((res) => res.json())

        .then((data) => {
            // Used for the setURL to find the tagArray
            // const parsedURL = data.results.map(
            //     (r) => r.key.href.replace("https://us.api.blizzard.com/data/wow/media/", "").split("/")[0]
            // );

            // Set class only allows unique elements
            // const setURL = [...new Set(parsedURL)];
            res.json(data);
        });
});

export default router;
