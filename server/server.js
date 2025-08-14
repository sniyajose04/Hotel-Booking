import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import bodyParser from "body-parser";

connectDB();

const app = express();
app.use(cors());

// ✅ Normal routes still use express.json()
app.use(express.json());

// ✅ Webhook route MUST use raw body
app.post("/api/clerk", 
    bodyParser.raw({ type: "application/json" }), 
    clerkWebhooks
);

app.get("/", (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
