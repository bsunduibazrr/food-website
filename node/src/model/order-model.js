import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const orderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },

    foodOrderItem: [
      { food: { type: ObjectId, ref: "Food" }, quantity: Number },
    ],

    address: { type: String, required: true },
    price: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("order", orderSchema);
