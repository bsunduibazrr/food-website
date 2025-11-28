//update-put

import { orderModel } from "../../../model/order-model.js";

export const putOrder = async (req, res) => {
  try {
    const filter = { name: "" };
    const update = { name: "" };

    const updatedOrder = await orderModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).send("order with name not found");
    }

    res.send(`order name updated to ${updatedOrder.name}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
