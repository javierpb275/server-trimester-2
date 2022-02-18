const Appointment = require("../models/appointment.model");
const helperPag = require("../helpers/pagination.helper");
//const helperVal = require("../helpers/validation.helper");
const Person = require("../models/person.model");
const Doctor = require("../models/doctor.model");

const createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    return res.status(201).send(newAppointment);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getAppointments = async (req, res) => {
  const { limit, skip, sort } = helperPag.getPaginationOptions(req.query);
  const match = helperPag.getMatch(req.query);
  try {
    const appointments = await Appointment.find(match)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    return res.status(200).send(appointments);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id });
    if (!appointment) {
      return res.status(404).send({ error: "Appointment Not Found!" });
    }
    return res.status(200).send(appointment);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const updateAppointment = async (req, res) => {
  const { params, body } = req;
  try {
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).send({ error: "Appointment Not Found!" });
    }
    return res.status(200).send(updatedAppointment);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deleteAppointment = async (req, res) => {
  const { params } = req;
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(params.id);
    if (!deletedAppointment) {
      return res.status(404).send({ error: "Appointment Not Found!" });
    }
    return res.status(200).send(deletedAppointment);
  } catch (error) {
    return res.status(500).send(err);
  }
};

const getPersonAppointments = async (req, res) => {
  const { params, query } = req;
  const options = helperPag.getPaginationOptions(query);
  const match = helperPag.getMatch(query);
  try {
    const person = await Person.findOne({ _id: params.personId });
    if (!person) {
      return res.status(404).send({ error: "Person Not Found!" });
    }
    await person.populate({
      path: "appointments",
      match,
      options,
    });
    return res.status(200).send(person.appointments);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getDoctorAppointments = async (req, res) => {
  const { params, query } = req;
  const options = helperPag.getPaginationOptions(query);
  const match = helperPag.getMatch(query);
  try {
    const doctor = await Doctor.findOne({ _id: params.docId });
    if (!doctor) {
      return res.status(404).send({ error: "Person Not Found!" });
    }
    await doctor.populate({
      path: "appointments",
      match,
      options,
    });
    return res.status(200).send(doctor.appointments);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getDoctorAppointments,
  getPersonAppointments,
};
