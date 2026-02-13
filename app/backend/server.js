const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongodb:27017/testdb";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://52.151.203.181";
const corsOptions = {
  origin: [FRONTEND_ORIGIN],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"],
  credentials: false
};
app.use(cors(corsOptions));
app.options("*_", cors(corsOptions));    // explicit preflight handler
app.use(express.json());

// Connect to Mongo
mongoose.connect(MONGO_URL)
  .then(() => console.log("Mongo connected"))
  .catch(err => console.error("Mongo connection error:", err));

// Simple schema+model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Item = mongoose.model("Item", itemSchema);

// Health/info endpoint
app.get("/api", (req, res) => {
  res.json({ message: "Backend working!", mongoUrl: MONGO_URL });
});

// List items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Create item
app.post("/api/items", async (req, res) => {
  try {
    const { name } = req.body;
    const item = await Item.create({ name });
    res.status(201).json(item);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Failed to create item" });
  }
});

app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
