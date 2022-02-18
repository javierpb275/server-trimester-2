const express = require("express");
const tallerController = require("../controllers/taller.controller");

const router = new express.Router();

router.post("/", tallerController.createTaller);
router.get("/", tallerController.getTalleres);
router.get("/:id", tallerController.getTaller);
router.patch("/:id", tallerController.updateTaller);
router.delete("/:id", tallerController.deleteTaller);

module.exports = router;