import express from "express";
import cors from "cors";
import connectDB from "./database/database.js";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Load environment variables from .env file

// Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS configuration
// Optional: set CORS_ALLOW_ORIGIN as a comma-separated list of allowed origins
// Example: CORS_ALLOW_ORIGIN=https://example.com,https://app.example.com
const rawOrigins = process.env.CORS_ALLOW_ORIGIN || "*";
const corsOptions =
  rawOrigins === "*"
    ? { origin: true }
    : {
        origin: (origin, callback) => {
          if (!origin) return callback(null, true); // allow non-browser requests like curl/postman
          const allowed = rawOrigins.split(",").map((s) => s.trim());
          callback(null, allowed.includes(origin));
        },
      };

app.use(cors(corsOptions));

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
