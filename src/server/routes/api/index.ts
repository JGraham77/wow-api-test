import express from "express";
import searchRoute from "./search";
import playableRoute from "./playable";

const router = express.Router();

router.use("/search", searchRoute);
router.use("/playable", playableRoute);

export default router;
