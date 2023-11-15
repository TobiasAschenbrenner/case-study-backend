import express from "express";
import {
  createRole,
  getAllRoles,
  updateRole,
  deleteRole,
} from "../controllers/role.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create a new role in DB
router.post("/create", verifyAdmin, createRole);

// Update a role in DB
router.put("/update/:id", verifyAdmin, updateRole);

// Get all roles from DB
router.get("/getAll", verifyAdmin, getAllRoles);

// Delete a role from DB
router.delete("/deleteRole/:id", verifyAdmin, deleteRole);

export default router;
