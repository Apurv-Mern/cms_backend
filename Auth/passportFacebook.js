const passport = require("passport");
const { Strategy: FacebookStrategy } = require("passport-facebook");
const User = require("../models/user");

const clientId = process.env.FACEBOOK_CLIENT_ID;
const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
const jwt = require("jsonwebtoken");
passport.use(
  new FacebookStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "/api/authentication/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
      scope: ["email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        // Check if profile.emails is defined and has at least one email
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

        if (!email) {
          // Handle the case where no email is provided
          return done(new Error("No email found in Facebook profile"), null);
        }

        let user = await User.findOne({ where: { facebookId: profile.id } });
        if (!user) {
          user = await User.create({
            facebookId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails ? profile.emails[0].value : null,
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
