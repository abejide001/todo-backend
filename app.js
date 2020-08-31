/*global process, */
const express = require("express")
const session = require("express-session")
const cors = require("cors")
const bodyParser = require("body-parser")
const passport = require("./src/services/passport")
const dotenv = require("dotenv")
const todoRouter = require("./src/routes/todoRoute")
const authRouter = require("./src/routes/authRoute")
const socialRouter = require("./src/routes/socialRoute")
const { sendFailureResponse, sendSuccessResponse } = require("./src/utils/appResponse")


dotenv.config()

const app = express()

app.use(cors())
app.options("*", cors())
app.use(bodyParser.json())

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/todos", todoRouter)
app.use("/api/v1/auth", authRouter)
app.use("/auth", socialRouter)

app.get("/api/v1", (req, res) => {
    sendSuccessResponse(res, 200, "Welcome to v1 of Todo api")
})

// catch routes that does not exist
app.all("*", (req, res) => {
    sendFailureResponse(res, 404, "route does not exist")
})

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

module.exports = app