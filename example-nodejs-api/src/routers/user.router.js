const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.post("/refreshToken", userController.refreshToken);
router.post("/", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/signout", auth, userController.signOut);
router.get("/me", auth, userController.getProfile);
router.patch("/me", auth, userController.updateProfile);
router.delete("/me", auth, userController.deleteProfile);
router.get("/", auth, userController.getUsers);
router.get("/:id", auth, userController.getUser);

module.exports = router;