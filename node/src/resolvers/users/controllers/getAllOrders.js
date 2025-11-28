import { orderModel } from "../../../model/order-model.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate(["foodOrderItem.food"]);

    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
