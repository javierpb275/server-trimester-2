const express = require("express");
const doctorController = require("../controllers/doctor.controller");

const router = new express.Router();

router.post("/", doctorController.createDoctor);
router.get("/", doctorController.getDoctors);
router.get("/:id", doctorController.getDoctor);
router.patch("/:id", doctorController.updateDoctor);
router.delete("/:id", doctorController.deleteDoctor);

module.exports = router;
