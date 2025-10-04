import express from "express";
import connectDB from "./database/database.js";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Load environment variables from .env file

// Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection

connectDB();

// Routes
app.get("/", (req, res) => {
  console.log("📩 Request received at /");
  res.send("Hello World!");
});
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
