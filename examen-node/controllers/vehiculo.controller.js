const Vehiculo = require("../models/vehiculo.model");
const helperPag = require("../helpers/pagination.helper");

const createVehiculo = async (req, res) => {
    try {
        const newVehiculo = new Vehiculo(req.body);
        await newVehiculo.save();
        return res.status(201).send(newVehiculo);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const getVehiculos = async (req, res) => {
    const { limit, skip, sort } = helperPag.getPaginationOptions(req.query);
    const match = helperPag.getMatch(req.query);
    try {
        const vehiculos = await Vehiculo.find(match).sort(sort).skip(skip).limit(limit);
        return res.status(200).send(vehiculos);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const getVehiculo = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findOne({ _id: req.params.id });
        if (!vehiculo) {
            return res.status(404).send({ error: "Vehiculo Not Found!" });
        }
        return res.status(200).send(vehiculo);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const updateVehiculo = async (req, res) => {
    const { params, body } = req;
    try {
        const updatedVehiculo = await Vehiculo.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        );
        if (!updatedVehiculo) {
            return res.status(404).send({ error: "Vehiculo Not Found!" });
        }
        return res.status(200).send(updatedVehiculo);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const deleteVehiculo = async (req, res) => {
    const { params } = req;
    try {
        const deletedVehiculo = await Vehiculo.findByIdAndDelete(params.id);
        if (!deletedVehiculo) {
            return res.status(404).send({ error: "Vehiculo Not Found!" });
        }
        return res.status(200).send(deletedVehiculo);
    } catch (error) {
        return res.status(500).send(err);
    }
};

module.exports = {
    createVehiculo,
    getVehiculos,
    getVehiculo,
    updateVehiculo,
    deleteVehiculo,
};