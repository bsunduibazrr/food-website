import mongoose from "mongoose";
const { Schema, model } = mongoose;
const ObjectId = Schema.ObjectId;

const foodSchema = new mongoose.Schema({
  id: ObjectId,
  foodName: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: String, unique: true },
  ingredients: { type: String, require: true },
  category: { type: ObjectId, require: true, ref: "category" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const foodModel = mongoose.model("Food", foodSchema);
