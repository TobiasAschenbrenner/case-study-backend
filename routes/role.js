import express from "express";
import Role from "../models/Role.js";

const router = express.Router();

// Create a new role in DB
router.post("/create", async (req, res, next) => {
  try {
    if (req.body.role && req.body.role !== "") {
      const newRole = new Role(req.body);
      await newRole.save();
      return res.send("Role created successfully!");
    } else {
      return res.status(400).send("Bad request!");
    }
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
});

export default router;
