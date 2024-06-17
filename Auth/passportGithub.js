const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/user");

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

const jwt = require("jsonwebtoken");

passport.use(
  new GitHubStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "/api/authentication/auth/github/callback",
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        let user = await User.findOne({ where: { githubId: profile.id } });
        if (!user) {
          user = await User.create({
            githubId: profile.id,
            firstName: profile.username,

            email: profile.emails[0].value,
          });
          await user.save();
        }

        // Create a JWT token
        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" } // Token expires in 1 hour
        );
        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
