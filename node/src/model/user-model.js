import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, default: null },
  phoneNumber: {
    type: String,
    unique: false,
    default: null,
    required: false,
  },

  role: { type: String, default: "user" },
  orderedFoods: { type: Array, default: [] },
  isVerified: { type: Boolean, default: false },
});

export const UserModel = mongoose.model("users", userSchema);
