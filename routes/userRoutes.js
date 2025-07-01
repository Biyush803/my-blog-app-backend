const express = require("express");
const {
  registerController,
  loginController,
  getAllUsers,
} = require("../controller/userController");

const requireSignIn = require("../middleware/authMiddleware");

const router = express.Router();

// GET all users (Protected)
router.get("/all-users", requireSignIn, getAllUsers);

// REGISTER user
router.post("/register", registerController);

// LOGIN user
router.post("/login", loginController);

module.exports = router;
