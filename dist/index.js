var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod
  )
);

// index.js
var import_express3 = __toESM(require("express"));

// database/database.js
var import_mongoose = __toESM(require("mongoose"));
var connectDB = async () => {
  try {
    await import_mongoose.default.connect(
      "mongodb+srv://ahmedarts817_db_user:EXOumt271kyWXOwy@cluster0.vtpdjex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("\u2705 Connected to MongoDB!");
  } catch (error) {
    console.error("\u274C MongoDB connection error:", error.message);
    process.exit(1);
  }
};
var database_default = connectDB;

// routes/userRoutes.js
var import_express = __toESM(require("express"));

// database/models/user.js
var import_mongoose2 = __toESM(require("mongoose"));
var userSchema = new import_mongoose2.default.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
    // adds createdAt and updatedAt automatically
  }
);
var User = import_mongoose2.default.model("User", userSchema);
var user_default = User;

// routes/userRoutes.js
var router = import_express.default.Router();
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await user_default.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new user_default({
      name,
      email,
      password,
      // ⚠️ Hash before saving in production
      role,
    });
    await user.save();
    res.status(201).json({
      message: "\u2705 User created successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "\u274C Server error", error: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await user_default.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "\u274C Server error", error: error.message });
  }
});
var userRoutes_default = router;

// routes/taskRoutes.js
var import_express2 = __toESM(require("express"));

// database/models/tasks.js
var import_mongoose3 = __toESM(require("mongoose"));
var taskSchema = new import_mongoose3.default.Schema(
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
  { timestamps: true }
  // adds createdAt & updatedAt
);
var Task = import_mongoose3.default.model("Task", taskSchema);
var tasks_default = Task;

// routes/taskRoutes.js
var router2 = import_express2.default.Router();
router2.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const task = new tasks_default({ title, description });
    await task.save();
    res.status(201).json({
      message: "\u2705 Task created successfully",
      task,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "\u274C Server error", error: error.message });
  }
});
router2.get("/", async (req, res) => {
  try {
    const tasks = await tasks_default.find();
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "\u274C Server error", error: error.message });
  }
});
router2.get("/:id", async (req, res) => {
  try {
    const task = await tasks_default.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "\u274C Server error", error: error.message });
  }
});
router2.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await tasks_default.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({
      message: "\u2705 Task updated successfully",
      task,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "\u274C Server error", error: error.message });
  }
});
router2.delete("/:id", async (req, res) => {
  try {
    const task = await tasks_default.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res
      .status(200)
      .json({ message: "\u{1F5D1}\uFE0F Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "\u274C Server error", error: error.message });
  }
});
router2.delete("/", async (req, res) => {
  try {
    const result = await tasks_default.deleteMany({});
    res.status(200).json({
      message: `\u{1F5D1}\uFE0F Deleted ${result.deletedCount} task(s) successfully`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "\u274C Server error", error: error.message });
  }
});
var taskRoutes_default = router2;

// index.js
var app = (0, import_express3.default)();
var port = process.env.PORT || 3e3;
app.use(import_express3.default.json());
database_default();
app.get("/", (req, res) => {
  console.log("\u{1F4E9} Request received at /");
  res.send("Hello World!");
});
app.use("/api/users", userRoutes_default);
app.use("/api/tasks", taskRoutes_default);
app.listen(port, () => {
  console.log(`\u{1F680} Server running on port ${port}`);
});
