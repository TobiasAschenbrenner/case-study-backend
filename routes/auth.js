import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

// Register a user

router.post("/register", register);

// Login a user
router.post("/login", login);

export default router;
