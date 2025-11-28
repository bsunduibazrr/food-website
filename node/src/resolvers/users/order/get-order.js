import { orderModel } from "../../../model/order-model.js";

export const getOrder = async (req, res) => {
  const dbOrder = await orderModel.find().populate("name, image");
  console.log(dbOrder);
  res.status(200).json(dbOrder);
};
