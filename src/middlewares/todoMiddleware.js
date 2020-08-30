const mongoose = require("mongoose")

const { sendFailureResponse } = require("../utils/appResponse")
const Todo = require("../models/Todo")

exports.validateTodoBody = (req, res, next) => {
    const { name, description, priority } = req.body

    if (!name) {
        sendFailureResponse(res, 400, "enter name of the todo")
        return
    }

    if (!description) {
        sendFailureResponse(res, 400, "enter the description")
        return
    }

    if (!priority) {
        sendFailureResponse(res, 400, "enter a priority")
        return
    }
    next()
}

exports.checkTourId = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.todoId)) return sendFailureResponse(res, 404, "Todo not found")
        const todo = await Todo.findById(req.params.todoId)
        if (!todo) return sendFailureResponse(res, 404, "Todo not found")
    } catch (error) {
        return sendFailureResponse(res, 500, error.message)
    }
    next()
}

