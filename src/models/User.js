const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Please enter a name"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Please enter an email"]
    },
    password: {
        type: String,
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        minlength: 8
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User