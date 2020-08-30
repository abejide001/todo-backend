const User = require("../models/User")
const { sendFailureResponse, sendSuccessResponse } = require("../utils/appResponse")
const { jwtSign } = require("../helpers/token")
const { hashPassword } = require("../helpers/hashPassword")

exports.signUp = async (req, res) => {
    try {
        let { name, email, password } = req.body
        password = hashPassword(password)
        const newUser = await User.create({
            name, email, password
        })
        const userToken = jwtSign(newUser)
        return sendSuccessResponse(res, 201, {
            user: { name, email, userToken }
        })
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}

exports.signIn = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        const token = jwtSign(user)
        sendSuccessResponse(res, 200, { token })
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}

exports.googleSignIn = async (accessToken, refreshToken, profile, done) => {
    const { displayName, emails } = profile
    const currentUser = await User.findOne({
        email: emails[0].value
    })

    if (currentUser) {
        done(null, currentUser)
    } else {
        const newUser = await new User({
            name: displayName,
            email: emails[0].value,
            password: null
        })
        await newUser.save()
        done(null, newUser)
    }
}
