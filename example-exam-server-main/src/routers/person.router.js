const express = require("express");
const personController = require("../controllers/person.controller");

const router = new express.Router();

router.post("/", personController.createPerson);
router.get("/", personController.getPeople);
router.get("/:id", personController.getPerson);
router.patch("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

module.exports = router;
