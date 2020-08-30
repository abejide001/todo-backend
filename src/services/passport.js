/*global process, */
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const dotenv = require("dotenv")

const { googleSignIn } = require("../controllers/AuthenticationController")
dotenv.config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  }, googleSignIn));

module.exports = passport