// create-post

import { orderModel } from "../../../model/order-model.js";

export const postOrder = async (req, res) => {
  const newOrder = req.body;
  await orderModel.create({
    foodName: newOrder.foodName,
    price: newOrder.price,
    foodOrderItems: newOrder.foodOrderItems,
    status: newOrder.status,
    ingredients: newOrder.ingredients,
    createdAt: newOrder.createdAt,
    updatedAt: newOrder.updatedAt,
  });
  res.status(200).json("new order added");
};
