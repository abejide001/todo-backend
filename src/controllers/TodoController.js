const Todo = require("../models/Todo")
const { sendFailureResponse, sendSuccessResponse } = require("../utils/appResponse")

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).populate("user", ["name"])
        sendSuccessResponse(res, 200, todos)
    }
    catch (err) {
        sendFailureResponse(res, 500, err.message)
    }
}

exports.getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoId)
        sendSuccessResponse(res, 200, todo)
    } catch (err) {
        sendFailureResponse(res, 500, err.message)
    }
}

exports.createTodo = async (req, res) => {
    try {
        const { name, description, priority, completed } = req.body
        const newTodo = await Todo.create({
            name,
            description,
            priority,
            completed,
            user: req.user.id
        })
        sendSuccessResponse(res, 201, newTodo)
    } catch (err) {
        sendFailureResponse(res, 500, err.message)
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.todoId, req.body, {
            new: true
        })
        sendSuccessResponse(res, 200, todo)
    } catch (err) {
        sendFailureResponse(res, 500, err.message)
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.todoId)
        sendSuccessResponse(res, 204, "Deleted successfully")
    } catch (err) {
        sendFailureResponse(res, 500, err.message)
    }
}