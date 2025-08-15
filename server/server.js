import "dotenv/config"; // Load env FIRST
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./configs/db.js"; // Now env vars are available
import clerkWebhooks from "./controllers/clerkWebhooks.js";

const app = express();

// Connect to MongoDB
await connectDB();

app.use(cors());


// Clerk middleware
app.use(clerkMiddleware());

// Webhook route with raw body
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

app.use(express.json());

app.get("/", (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
