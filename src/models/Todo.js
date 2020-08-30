const mongoose = require("mongoose")
const slugify = require("slugify")

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'A todo must have a name'],
        maxlength: [40, 'A todo name must have less than equal 40 characters'],
        minlength: [1, 'A todo name must have more than equal 10 characters']
    },
    description: {
        type: String,
        required: [true, 'A todo must have a description'],
        maxlength: [40, 'A todo description must have less than equal 40 characters'],
        minlength: [5, 'A todo description must have more than equal 10 characters']
    },
    slug: {
        type: String
    },
    priority: {
        type: String,
        required: true,
        enum: {
            values: ["low", "medium", "high"],
            message: "Priority is either: low, medium, high"
        }
    },
    completed: {
        type: Boolean,
        default: false,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
})

// Document middleware
todoSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo