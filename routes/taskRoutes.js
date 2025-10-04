// routes/taskRoutes.js
import express from "express";
import Task from "../database/models/tasks.js";

const router = express.Router();

// @route   POST /api/tasks
// @desc    Create a new task
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({ title, description });
    await task.save();

    res.status(201).json({
      message: "✅ Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// @route   GET /api/tasks
// @desc    Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get a single task
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({
      message: "✅ Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a single task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "🗑️ Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// @route   DELETE /api/tasks
// @desc    Delete all tasks
router.delete("/", async (req, res) => {
  try {
    const result = await Task.deleteMany({});
    res.status(200).json({
      message: `🗑️ Deleted ${result.deletedCount} task(s) successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

export default router;
