const express = require("express")
// const { protectRoute } = require("../middlewares/protectRoute")
const todoRouter = express.Router()

const { createTodo, getTodo, getTodos, deleteTodo, updateTodo } = require("../controllers/TodoController")
const { validateTodoBody, checkTourId } = require("../middlewares/todoMiddleware")
const { protectRoute } = require("../middlewares/authMiddleware")

todoRouter.post("/", protectRoute, validateTodoBody, createTodo)
todoRouter.get("/:todoId", checkTourId, getTodo)
todoRouter.delete("/:todoId", checkTourId, deleteTodo)
todoRouter.get("/", protectRoute, getTodos)
todoRouter.patch("/:todoId", checkTourId, updateTodo)

module.exports = todoRouter