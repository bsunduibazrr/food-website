import mongoose from "mongoose";
const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);

export const categoryModel = mongoose.model("category", categorySchema);
