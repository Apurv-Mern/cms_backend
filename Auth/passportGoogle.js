const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const User = require("../models/user");
const jwt = require("jsonwebtoken");
passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        let user = await User.findOne({ where: { googleId: profile.id } });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
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
