const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth.middleware");
const taskController = require("../controllers/task.controller");

router.get("/", auth, taskController.getTasks);
router.get("/:id", auth, taskController.getTask);
router.post("/", auth, taskController.createTask);
router.patch("/:id", auth, taskController.updateTask);
router.delete("/:id", auth, taskController.deleteTask);
router.post("/addFavorites", auth, taskController.addFavorites);
router.post("/removeFavorites", auth, taskController.removeFavorites);
router.get("/me/favoriteTasks", auth, taskController.getFavoriteTasks);
router.get("/me/createdTasks", auth, taskController.getProfileTasks);
router.get("/userTasks/:userId", auth, taskController.getUserTasks);

module.exports = router;