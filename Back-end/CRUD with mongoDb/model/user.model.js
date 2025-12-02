import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
}, { timestamps: true });

const userModel = mongoose.model("UserSchema", userSchema);
export default userModel;