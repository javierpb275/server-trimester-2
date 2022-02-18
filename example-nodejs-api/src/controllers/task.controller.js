const helpPagination = require("../helpers/pagination.helper");
const helpValidation = require("../helpers/validation.helper");
const Task = require("../models/task.model");
const User = require("../models/user.model");

//CREATE TASK
const createTask = async (req, res) => {
    const { userId, body } = req;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ error: "User Not Found!" });
        }
        const newTask = new Task({ ...body, user: user._id });
        await newTask.save();
        return res.status(201).send(newTask);
    } catch (err) {
        return res.status(400).send(err);
    }
}

//GET TASKS
const getTasks = async (req, res) => {
    const { query } = req;
    const { limit, skip, sort } = helpPagination.getPaginationOptions(query);
    const options = { limit, skip, sort };
    const match = helpPagination.getMatch(query);
    try {
        const allTasks = await Task.find(match)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate({ path: "user", select: "username email", match, options });
        return res.status(200).send(allTasks);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//GET TASK
const getTask = async (req, res) => {
    const { params } = req;
    try {
        const task = await Task.findOne({ _id: params.id });
        if (!task) {
            return res.status(404).send({ error: "Task Not Found!" });
        }
        await task.populate({ path: "user", select: "username email" });
        return res.status(200).send(task);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//UPDATE TASK
const updateTask = async (req, res) => {
    const { userId, body, params } = req;
    const isValid = helpValidation.validateObjectProperties(body, ["completed", "description"]);
    if (!isValid) {
        return res.status(400).send({ error: "Invalid properties!" });
    }
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: params.id, user: userId },
            body,
            {
                new: true,
            }
        );
        if (!updatedTask) {
            return res.status(404).send({ error: "Review Not Found!" });
        }
        return res.status(200).send(updatedTask);
    } catch (err) {
        return res.status(400).send(err);
    }
}

//DELETE TASK
const deleteTask = async (req, res) => {
    const { userId, params } = req;
    try {
        const task = await Task.findOne({
            _id: params.id,
            user: userId,
        });
        if (!task) {
            return res.status(404).send({ error: "Review Not Found!" });
        }
        await task.remove();
        return res.status(200).send(task);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//GET PROFILE TASKS
const getProfileTasks = async (req, res) => {
    const { userId, query } = req;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ error: "User Not Found!" });
        }
        const options = helpPagination.getPaginationOptions(query);
        const match = helpPagination.getMatch(query);
        await user.populate({
            path: "tasks",
            match,
            options,
        });
        return res.status(200).send(user.tasks);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//GET USER TASKS
const getUserTasks = async (req, res) => {
    const { params, query } = req;
    try {
        const user = await User.findOne({ _id: params.userId });
        if (!user) {
            return res.status(404).send({ error: "User Not Found!" });
        }
        const options = helpPagination.getPaginationOptions(query);
        const match = helpPagination.getMatch(query);
        await user.populate({
            path: "tasks",
            match,
            options,
        });
        return res.status(200).send(user.tasks);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//ADD FAVORITES:
const addFavorites = async (req, res) => {
    const { userId, body } = req;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ error: "User Not Found!" });
        }
        if (!body.taskId) {
            return res
                .status(400)
                .send({ error: "Please, provide id of favorite task!" });
        }
        await User.updateOne(
            { _id: user._id },
            { $push: { favoriteTasks: body.taskId } }
        );
        return res.status(200).send({ message: "added task successfully" });
    } catch (err) {
        return res.status(400).send(err);
    }
}

//REMOVE FAVORITES:
const removeFavorites = async (req, res) => {
    const { userId, body } = req;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ error: "User Not Found!" });
        }
        if (!body.reviewId) {
            return res
                .status(400)
                .send({ error: "Please, provide id of task you want to remove!" });
        }
        await User.updateOne(
            { _id: user._id },
            { $pull: { favoriteTasks: body.reviewId } }
        );
        return res.status(200).send({ message: "removed task successfully" });
    } catch (err) {
        return res.status(400).send(err);
    }
}

//GET FAVORITE TASKS:
const getFavoriteTasks = async (req, res) => {
    const { userId, query } = req;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ error: "User Not Found!" });
        }
        const options = helpPagination.getPaginationOptions(query);
        const match = helpPagination.getMatch(query);
        await user.populate({
            path: "favoriteTasks",
            match,
            options,
        });
        return res.status(200).send(user.favoriteTasks);
    } catch (err) {
        return res.status(500).send(err);
    }
}


module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    getProfileTasks,
    getUserTasks,
    addFavorites,
    removeFavorites,
    getFavoriteTasks
}