const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth");
const noteRoutes = require("./src/routes/notes");
const aiRoutes = require("./src/routes/ai");

const app = express();

// Middleware Global
app.use(cors());
app.use(express.json());

// --- Health Check (Halaman Depan) ---
app.get("/", (req, res) => {
  res.json({
    message: "SecondBrain API is running (Modular Version)",
    status: "Success",
    timestamp: new Date(),
  });
});

// 1. Auth Routes (Login & Register)
app.use("/", authRoutes); 

// 2. Note Routes (CRUD Catatan)
app.use("/notes", noteRoutes);

// 3. AI Routes (Gemini)
app.use("/ai", aiRoutes);

module.exports = app;