const express = require("express");
const router = express.Router();
const passport = require("passport");

//Github routes
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/",
    session: false,
  }),
  (req, res) => {
    const { user, token } = req.user;
    console.log(
      "github userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
      req.user
    );
    res.cookie("token", token, { httpOnly: false, sameSite: "Strict" });

    res.cookie("user-details", JSON.stringify(user), {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiration
      sameSite: "Strict",
      // secure: true,
      // httpOnly: true,
    });

    // res.setHeader("Authorization", `Bearer ${token}`);
    res.redirect("http://localhost:3000/dashboard");
  }
);

module.exports = router;
