const Reparacion = require("../models/reparacion.model");
const helperPag = require("../helpers/pagination.helper");

const createReparacion = async (req, res) => {
    try {
        const newReparacion = new Reparacion(req.body);
        await newReparacion.save();
        return res.status(201).send(newReparacion);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const getReparaciones = async (req, res) => {
    const { limit, skip, sort } = helperPag.getPaginationOptionsForReparaciones(req.query);
    const match = helperPag.getMatch(req.query);
    try {
        const reparaciones = await Reparacion.find(match)
            .sort(sort)
            .skip(skip)
            .limit(limit).populate(
[            {
                path: "vehiculo",
            },
            {
                path: "taller",
            },]
        );
        return res.status(200).send(reparaciones);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const getReparacion = async (req, res) => {
    try {
        const reparacion = await Reparacion.findOne({ _id: req.params.id });
        if (!reparacion) {
            return res.status(404).send({ error: "Reparacion Not Found!" });
        }
        await reparacion.populate([{ path: "vehiculo" }, { path: "taller" }]);
        return res.status(200).send(reparacion);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const updateReparacion = async (req, res) => {
    const { params, body } = req;
    try {
        const updatedReparacion = await Reparacion.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        );
        if (!updatedReparacion) {
            return res.status(404).send({ error: "Reparacion Not Found!" });
        }
        return res.status(200).send(updatedReparacion);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const deleteReparacion = async (req, res) => {
    const { params } = req;
    try {
        const deletedReparacion = await Reparacion.findByIdAndDelete(params.id);
        if (!deletedReparacion) {
            return res.status(404).send({ error: "Reparacion Not Found!" });
        }
        return res.status(200).send(deletedReparacion);
    } catch (error) {
        return res.status(500).send(err);
    }
};


module.exports = {
    createReparacion,
    getReparaciones,
    getReparacion,
    updateReparacion,
    deleteReparacion,
};