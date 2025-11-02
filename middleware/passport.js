// const GoogleStrategy = require("passport-google-oauth20").Strategy;
import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";

// ________Google OAuth Strategy________
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

// ________Google OAuth Strategy________

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

