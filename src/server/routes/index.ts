import express from "express";
import apiRouter from "./api";
import authRouter from "./auth";
import oauthRouter from "./oauth";

const router = express.Router();

router.use("/api", apiRouter);
router.use("/auth", authRouter);
router.use("/oauth", oauthRouter);

export default router;
