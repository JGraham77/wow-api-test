import express from "express";
import bnetRouter from "./bnet";

const router = express.Router();

router.use("/battlenet", bnetRouter);

export default router;
