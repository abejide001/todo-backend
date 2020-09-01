/*global process, */
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const dotenv = require("dotenv")

const { googleSignIn } = require("../controllers/AuthenticationController")
dotenv.config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_APP,
  }, googleSignIn));

module.exports = passport