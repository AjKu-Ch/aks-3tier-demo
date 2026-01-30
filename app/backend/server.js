const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Connect to MongoDB (via Docker network)
mongoose
  .connect("mongodb://mongodb:27017/testdb")
  .then(() => console.log("Mongo connected"))
  .catch(err => console.log(err));

app.get("/api", (req, res) => {
  res.json({ message: "Backend working!" });
});

// Check if MongoDB is connected (readyState: 1 = connected)
app.get("/api/health", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.json({
    backend: "OK",
    database: dbConnected ? "Connected" : "Disconnected",
  });
});

app.listen(PORT, () => console.log(`Backend running on ${PORT}`));