/*global process, */
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()
const { DB_PASSWORD, DB_NAME } = process.env

const connectDB = () => {
    if (process.env.NODE_ENV === "development") {
       return mongoose.connect(`mongodb://127.0.0.1:27017/todo`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })
            .then(() => console.log(`development database connected successfully`))
            .catch((err) => console.log(err.message))
    } else {
        mongoose.connect(`mongodb+srv://todo:${DB_PASSWORD}@cluster0.sxvwh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })
            .then(() => console.log(`prod database connected successfully`))
            .catch((err) => console.log(err.message))
    }
}

module.exports = connectDB