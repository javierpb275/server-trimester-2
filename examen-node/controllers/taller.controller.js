const Taller = require("../models/taller.model");
const helperPag = require("../helpers/pagination.helper");

const createTaller = async (req, res) => {
    try {
        const newTaller = new Taller(req.body);
        await newTaller.save();
        return res.status(201).send(newTaller);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const getTalleres = async (req, res) => {
    const { limit, skip, sort } = helperPag.getPaginationOptions(req.query);
    const match = helperPag.getMatch(req.query);
    try {
        const talleres = await Taller.find(match).sort(sort).skip(skip).limit(limit);
        return res.status(200).send(talleres);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const getTaller = async (req, res) => {
    try {
        const taller = await Taller.findOne({ _id: req.params.id });
        if (!taller) {
            return res.status(404).send({ error: "Taller Not Found!" });
        }
        return res.status(200).send(taller);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const updateTaller = async (req, res) => {
    const { params, body } = req;
    try {
        const updatedTaller = await Taller.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        );
        if (!updatedTaller) {
            return res.status(404).send({ error: "Taller Not Found!" });
        }
        return res.status(200).send(updatedTaller);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const deleteTaller = async (req, res) => {
    const { params } = req;
    try {
        const deletedTaller = await Taller.findByIdAndDelete(params.id);
        if (!deletedTaller) {
            return res.status(404).send({ error: "Taller Not Found!" });
        }
        return res.status(200).send(deletedTaller);
    } catch (error) {
        return res.status(500).send(err);
    }
};

module.exports = {
    createTaller,
    getTalleres,
    getTaller,
    updateTaller,
    deleteTaller,
};