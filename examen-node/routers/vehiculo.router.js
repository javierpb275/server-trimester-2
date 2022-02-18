const express = require("express");
const vehiculoController = require("../controllers/vehiculo.controller");

const router = new express.Router();

router.post("/", vehiculoController.createVehiculo);
router.get("/", vehiculoController.getVehiculos);
router.get("/:id", vehiculoController.getVehiculo);
router.patch("/:id", vehiculoController.updateVehiculo);
router.delete("/:id", vehiculoController.deleteVehiculo);

module.exports = router;