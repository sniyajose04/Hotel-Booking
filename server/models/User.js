import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {type:String,required:true}, // allow Clerk's string ID
    username: {type:String,required:true},
    email: {type:String,required:true},
    image: {type:String,required:true},
    role: { type: String, default: "user" },
    recentSearchedCities: [String],
    createdAt: { type: Date, default: Date.now },
});


export default mongoose.model("User", userSchema);
