// database/models/tasks.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
