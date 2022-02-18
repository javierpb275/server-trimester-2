const helpAuthentication = require("../helpers/authenticaton.helper");
const helpPagination = require("../helpers/pagination.helper");
const helpValidation = require("../helpers/validation.helper");
const config = require("../config/config");
const User = require("../models/user.model");

let refreshTokens = [];

//GET USER
const getUser = async (req, res) => {
    const { params } = req;
    try {
        const user = await User.findOne({ _id: params.id });
        if (!user) {
            return res.status(404).send({ error: "User Not Found!" });
        }
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//GET USERS 
const getUsers = async (req, res) => {
    const { query } = req;
    const { limit, skip, sort } = helpPagination.getPaginationOptions(query);
    const match = helpPagination.getMatch(query);
    try {
        const allUsers = await User.find(match)
            .sort(sort)
            .skip(skip)
            .limit(limit);
        return res.status(200).send(allUsers);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//REFRESH TOKEN
const refreshToken = async (req, res) => {
    try {
        if (!req.body.token) {
            return res.status(400).send({ error: "Please, provide refresh token" });
        }
        if (!refreshTokens.includes(req.body.token)) {
            return res.status(400).send({ error: "Refresh Token Invalid" });
        }
        refreshTokens = refreshTokens.filter(
            (reToken) => reToken != req.body.token
        );
        const accessToken = helpAuthentication.generateToken(
            req.body.userId,
            config.AUTH.ACCESS_TOKEN_SECRET,
            "15m"
        );
        const refreshToken = helpAuthentication.generateToken(
            req.body.userId,
            config.AUTH.REFRESH_TOKEN_SECRET,
            "20m"
        );
        refreshTokens.push(refreshToken);
        return res.status(200).send({
            accessToken,
            refreshToken,
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}

//SIGN UP:
const signUp = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const foundUser = await User.findOne({
            email: req.body.email,
        });
        if (foundUser) {
            return res.status(400).send({ error: "Wrong email. Try again" });
        }
        const accessToken = helpAuthentication.generateToken(
            newUser._id.toString(),
            config.AUTH.ACCESS_TOKEN_SECRET,
            "15m"
        );
        const refreshToken = helpAuthentication.generateToken(
            newUser._id.toString(),
            config.AUTH.REFRESH_TOKEN_SECRET,
            "20m"
        );
        refreshTokens.push(refreshToken);
        await newUser.save();
        return res.status(201).send({
            user: newUser,
            accessToken,
            refreshToken,
        });
    } catch (err) {
        return res.status(400).send(err);
    }
}

//SIGN IN
const signIn = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .send({ error: "Please, send your email and password" });
    }
    try {
        const foundUser = await User.findOne({
            email: req.body.email,
        });
        if (!foundUser) {
            return res.status(400).send({ error: "Wrong credentials" });
        }
        const isMatch = await helpAuthentication.comparePassword(
            req.body.password,
            foundUser.password
        );
        if (!isMatch) {
            return res.status(400).send({ error: "Wrong credentials" });
        }
        const accessToken = helpAuthentication.generateToken(
            foundUser._id.toString(),
            config.AUTH.ACCESS_TOKEN_SECRET,
            "15m"
        );
        const refreshToken = helpAuthentication.generateToken(
            foundUser._id.toString(),
            config.AUTH.REFRESH_TOKEN_SECRET,
            "20m"
        );
        refreshTokens.push(refreshToken);
        return res.status(200).send({
            user: foundUser,
            accessToken,
            refreshToken,
        });
    } catch (err) {
        return res.status(400).send({ error: "Unable to sign in" });
    }
}

//SIGN OUT:
const signOut = async (req, res) => {
    if (!req.body.token) {
        return res.status(400).send({ error: "Please, provide refresh token" });
    }
    if (!refreshTokens.includes(req.body.token)) {
        return res.status(400).send({ error: "Refresh Token Invalid" });
    }
    try {
        refreshTokens = refreshTokens.filter(
            (reToken) => reToken != req.body.token
        );
        return res.status(200).send({ message: "signed out successfully" });
    } catch (err) {
        return res.status(500).send({ error: "Unable to sign out" });
    }
}

//GET PROFILE
const getProfile = async (req, res) => {
    const { userId } = req;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ error: "User Not Found!" });
        }
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//UPDATE PROFILE
const updateProfile = async (req, res) => {
    const { body, userId } = req;
    const isValid = helpValidation.validateObjectProperties(body, [
        "username",
        "email",
        "password",
        "favoriteTasks",
    ]);
    if (!isValid) {
        return res.status(400).send({ error: "Invalid properties!" });
    }
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ error: "User Not Found!" });
        }
        if (body.password) {
            const hash = await helpAuthentication.hashPassword(body.password);
            body.password = hash;
        }
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, body, {
            new: true,
        });
        return res.status(200).send(updatedUser);
    } catch (err) {
        return res.status(400).send(err);
    }
}

//DELETE PROFILE
const deleteProfile = async (req, res) => {
    const { userId } = req;
    if (!req.body.token) {
        return res.status(400).send({ error: "Please, provide refresh token" });
    }
    if (!refreshTokens.includes(req.body.token)) {
        return res.status(400).send({ error: "Refresh Token Invalid" });
    }
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ error: "User Not Found!" });
        }
        await user.remove();
        refreshTokens = refreshTokens.filter(
            (reToken) => reToken != req.body.token
        );
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
}



module.exports = {
    refreshToken,
    signUp,
    signIn,
    signOut,
    getProfile,
    updateProfile,
    deleteProfile,
    getUser,
    getUsers
}