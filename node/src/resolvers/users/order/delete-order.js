import { orderModel } from "../../../model/order-model.js";

export const deleteOrder = async (req, res) => {
  const deletel = req.body;
  await orderModel.findByIdAndDelete(deletel.id);
  res.send("order deleted successfully");
};
