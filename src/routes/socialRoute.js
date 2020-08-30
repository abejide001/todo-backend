const express = require("express")
const passport = require("../services/passport")

const { getToken } = require("../middlewares/authMiddleware")

const socialRouter = express.Router()

socialRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
socialRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', scope: ['profile', 'email'] }), getToken);

module.exports = socialRouter