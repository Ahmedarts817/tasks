// routes/userRoutes.js
import express from "express";
import User from "../database/models/user.js";

const router = express.Router();

// @route   POST /api/users
// @desc    Create a new user
// @access  Public (or protect later with auth)
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password, // ⚠️ Hash before saving in production
      role,
    });

    await user.save();

    res.status(201).json({
      message: "✅ User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// @route   GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // fetch all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

export default router;
