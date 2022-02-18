const Doctor = require("../models/doctor.model");
const helperPag = require("../helpers/pagination.helper");
//const helperVal = require("../helpers/validation.helper");

const createDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    return res.status(201).send(newDoctor);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getDoctors = async (req, res) => {
  const { limit, skip, sort } = helperPag.getPaginationOptions(req.query);
  const match = helperPag.getMatch(req.query);
  try {
    const doctors = await Doctor.find(match).sort(sort).skip(skip).limit(limit);
    return res.status(200).send(doctors);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.params.id });
    if (!doctor) {
      return res.status(404).send({ error: "Doctor Not Found!" });
    }
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const updateDoctor = async (req, res) => {
  const { params, body } = req;
  try {
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true }
    );
    if (!updatedDoctor) {
      return res.status(404).send({ error: "Person Not Found!" });
    }
    return res.status(200).send(updatedDoctor);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deleteDoctor = async (req, res) => {
  const { params } = req;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(params.id);
    if (!deletedDoctor) {
      return res.status(404).send({ error: "Person Not Found!" });
    }
    return res.status(200).send(deletedDoctor);
  } catch (error) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
