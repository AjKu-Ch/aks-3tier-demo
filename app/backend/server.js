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

app.listen(PORT, () => console.log(`Backend running on ${PORT}`));