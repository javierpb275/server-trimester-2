const express = require("express");
const reparacionController = require("../controllers/reparacion.controller");

const router = new express.Router();

router.post("/", reparacionController.createReparacion);
router.get("/", reparacionController.getReparaciones);
router.get("/:id", reparacionController.getReparacion);
router.patch("/:id", reparacionController.updateReparacion);
router.delete("/:id", reparacionController.deleteReparacion);

module.exports = router;