import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import clerkWebhooks from "./controllers/clerkWebhooks.js";


dotenv.config();
const app = express();

app.use(cors());

// ✅ Use raw body ONLY for webhook route
app.use("/api/clerk", bodyParser.raw({ type: "application/json" }));

// ✅ Normal JSON parsing for other routes
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Webhook route
app.post("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
