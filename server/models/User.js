import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: String, // allow Clerk's string ID
    username: String,
    email: String,
    image: String,
    role: { type: String, default: "user" },
    recentSearchedCities: [String],
    createdAt: { type: Date, default: Date.now },
});


export default mongoose.model("User", userSchema);
