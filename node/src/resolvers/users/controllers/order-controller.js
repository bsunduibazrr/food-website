import { orderModel } from "../../../model/order-model.js";

export const createOrder = async (req, res) => {
  try {
    const create = req.body;

    const newOrder = await orderModel.create({
      email: create.email,
      address: create.address,
      price: create.price,
      foodOrderItem: create.items.map((item) => ({
        food: item.food,
        quantity: item.quantity,
      })),
    });

    const populatedOrder = await orderModel
      .findById(newOrder._id)
      .populate("foodOrderItem.food", "foodName price image");

    res.json({ message: "Order created", order: populatedOrder });
  } catch (err) {
    console.log("CREATE ORDER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
