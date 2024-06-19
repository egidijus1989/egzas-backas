const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authentication = require("../middleware/authentication");

router.post("/signup", authController.signup);
router.get("/", authentication, authController.getAllUsers)
router.post("/login", authController.login);
router.patch("/:id", authentication, authController.blockUser);

module.exports = router;
