const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require("../models/user");


const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;


passport.use(new GitHubStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: "/auth/github/callback",
    // scope: ["profile", "email"]
  },
async (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  try {
    let user = await User.findOne({ where: { githubId: profile.id } });
    if (!user) {
      user = await User.create({
        githubId: profile.id,
        firstName: profile.username,
        // lastName: profile.name.familyName,
        email: "saloni@getMaxListeners.com",
     
      });
      await user.save();
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
