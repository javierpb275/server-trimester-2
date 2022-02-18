const express = require("express");
const appointmentController = require("../controllers/appointment.controller");

const router = new express.Router();

router.post("/", appointmentController.createAppointment);
router.get("/", appointmentController.getAppointments);
router.get("/:id", appointmentController.getAppointment);
router.patch("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);
router.get(
  "/personAppointments/:personId",
  appointmentController.getPersonAppointments
);
router.get(
  "/doctorAppointments/:docId",
  appointmentController.getDoctorAppointments
);

module.exports = router;
