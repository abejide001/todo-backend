/*global process, */
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { jwtSign } = require("../helpers/token")

const { sendFailureResponse, sendSuccessResponse } = require("../utils/appResponse")
const User = require("../models/User")

exports.validateSignUpBody = (req, res, next) => {
    const { name, email, password } = req.body
    if (!name) {
        sendFailureResponse(res, 400, "enter a name")
        return
    }

    if (!email) {
        sendFailureResponse(res, 400, "enter a password")
        return
    }

    if (!password) {
        sendFailureResponse(res, 400, "enter a password")
        return
    }
    next()
}

exports.passwordMatch = (req, res, next) => {
    const { password, passwordConfirm } = req.body
    if (password !== passwordConfirm) {
        sendFailureResponse(res, 400, "Password does not match")
        return
    }
    next()
}

exports.checkEmail = async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) return sendFailureResponse(res, 400, "Invalid credentials")
    next()
}

exports.verifyPassword = async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    const pass = bcrypt.compareSync(password, user.password)
    if (!pass) return sendFailureResponse(res, 400, "Invalid Credentials")

    next()
}

exports.protectRoute = async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
        sendFailureResponse(res, 400, "Provide a token")
        return;
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decoded

        const freshUser = await User.findById(id).select(["-password"])
        req.user = freshUser // popluate req.user with logged in user info
    } catch (err) {
        return sendFailureResponse(res, 500, err.message)
    }
    next()
}

exports.getToken = async (req, res) => {
    const {
        email,
    } = req.user;
    const user = await User.findOne({ email })
    const token = jwtSign(user)
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded

    const freshUser = await User.findById(id).select(["-password"])
    req.user = freshUser
    sendSuccessResponse(res, 201, "User logged in successfully", { freshUser })
    // return res.redirect(`${process.env.FRONTEND_BASE_PATH}/auth?token=${token}`);
}