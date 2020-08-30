const express = require("express")

const authRouter = express.Router()

// const { protectRoute } = require("../middlewares/protectRoute")
const { passwordMatch, checkEmail, verifyPassword, validateSignUpBody } = require("../middlewares/authMiddleware")
const { signUp, signIn } = require("../controllers/AuthenticationController")

authRouter.post("/sign-up", validateSignUpBody, passwordMatch, signUp)

authRouter.post("/sign-in", checkEmail, verifyPassword, signIn)

// authRouter.get("/sign-out", logout)

// authRouter.post("/forget-password", checkEmailForForgotPassword, forgotPassword)

// authRouter.post("/reset/:token", passwordMatch, reset, resetPasssword)

// authRouter.patch("/update-password", protectRoute, confirmPasswordForUpdate, passwordMatch, updatePassword)

module.exports = authRouter