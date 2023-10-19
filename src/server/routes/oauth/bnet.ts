import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/callback", passport.authenticate("bnet", { failureRedirect: "/" }), function (req, res) {
    console.log("hello");
    console.log(req);
    res.redirect("/");
});
router.get("/", passport.authenticate("bnet"));

export default router;
