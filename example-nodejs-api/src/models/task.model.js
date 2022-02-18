const mongoose = require("mongoose");
const User = require("../models/user.model");

const taskSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

taskSchema.methods.toJSON = function () {
    const task = this;
    const taskObject = task.toObject();
    delete taskObject.__v;
    return taskObject;
};

taskSchema.pre("remove", async function (next) {
    const task = this;
    await User.updateMany({ $pull: { favoriteTasks: { _id: task._id } } });
    next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;