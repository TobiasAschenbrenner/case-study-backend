import express from "express";
import {
  login,
  register,
  registerAdmin,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Register as user

router.post("/register", register);

// Login as user
router.post("/login", login);

// register as admin
router.post("/register-admin", registerAdmin);

// send reset password email
router.post("/send-email");

export default router;
