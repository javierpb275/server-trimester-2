const Person = require("../models/person.model");
const helperPag = require("../helpers/pagination.helper");
//const helperVal = require("../helpers/validation.helper");

const createPerson = async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    await newPerson.save();
    return res.status(201).send(newPerson);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getPeople = async (req, res) => {
  const { limit, skip, sort } = helperPag.getPaginationOptions(req.query);
  const match = helperPag.getMatch(req.query);
  try {
    const people = await Person.find(match).sort(sort).skip(skip).limit(limit);
    return res.status(200).send(people);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getPerson = async (req, res) => {
  try {
    const person = await Person.findOne({ _id: req.params.id });
    if (!person) {
      return res.status(404).send({ error: "Person Not Found!" });
    }
    return res.status(200).send(person);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const updatePerson = async (req, res) => {
  const { params, body } = req;
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true }
    );
    if (!updatedPerson) {
      return res.status(404).send({ error: "Person Not Found!" });
    }
    return res.status(200).send(updatedPerson);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deletePerson = async (req, res) => {
  const { params } = req;
  try {
    const deletedPerson = await Person.findByIdAndDelete(params.id);
    if (!deletedPerson) {
      return res.status(404).send({ error: "Person Not Found!" });
    }
    return res.status(200).send(deletedPerson);
  } catch (error) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createPerson,
  getPeople,
  getPerson,
  updatePerson,
  deletePerson,
};
