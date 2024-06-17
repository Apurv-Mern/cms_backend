const express = require("express");
const router = express.Router();
const passport = require("passport");
// Facebook routes
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/",
    session: false,
  }),
  (req, res) => {
    console.log("requesttttttttttttttt", req.user);
    const { user, token } = req.user;
    res.cookie("token", token, { httpOnly: false, sameSite: "Strict" });

    res.cookie("user-details", JSON.stringify(user), {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiration
      sameSite: "Strict",
      // secure: true,
      // httpOnly: true,
    });

    res.redirect("http://localhost:3000/dashboard");
  }
);
module.exports = router;
