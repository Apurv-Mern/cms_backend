const express = require("express");
const router = express.Router();
const passport = require("passport");

//Github routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/`,
    session: false,
  }),
  (req, res) => {
    const { user, token } = req.user;

    res.cookie("token", token, { httpOnly: false, sameSite: "Strict" });

    res.cookie("user-details", JSON.stringify(user), {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiration
      sameSite: "Strict",
      // secure: true,
      // httpOnly: true,
    });

    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

module.exports = router;
