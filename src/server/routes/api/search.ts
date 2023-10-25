import express from "express";
import "../../types";

const router = express.Router();

router.get("/creatures", (req, res) => {
    const pageSize = req.query.pageSize || 20;
    const page = req.query.page || 1;

    fetch(
        `https://us.api.blizzard.com/data/wow/search/creature?namespace=static-us&orderby=id&_page=${page}&_pageSize=${pageSize}&access_token=${req.user.access_token}`
    )
        .then((res) => res.json())
        .then((data) => {
            res.json({ happyGreeting: "fuk u", data });
        });
});

router.get("/items", (req, res) => {
    const pageSize = req.query.pageSize || 20;
    const page = req.query.page || 1;

    fetch(
        `https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&orderby=id&_page=${page}&_pageSize=${pageSize}&access_token=${req.user.access_token}`
    )
        .then((res) => res.json())
        .then((data) => {
            res.json({ happyGreeting: "fuk u", data });
        });
});

export default router;
