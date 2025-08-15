import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./configs/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

const app = express();

// Connect to MongoDB
await connectDB();

app.use(cors());

// ✅ Webhook route FIRST — no clerkMiddleware, no express.json()
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// ✅ All other middleware AFTER webhook route
app.use(express.json());
app.use(clerkMiddleware());

// Example route
app.get("/", (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
