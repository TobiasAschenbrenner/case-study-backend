import express from "express";
import { createRole, updateRole } from "../controllers/role.controller.js";

const router = express.Router();

// Create a new role in DB
router.post("/create", createRole);

// Update a role in DB
router.put("/update/:id", updateRole);

export default router;
