import express from "express";
import { orderModel } from "../model/order.js";

const router = express.Router();

router.put("/update-status", async (req, res) => {
  const { orderIds, status } = req.body;

  if (!orderIds || !status) {
    return res.status(400).json({ message: "Missing orderIds or status" });
  }

  try {
    await orderModel.updateMany(
      { _id: { $in: orderIds } },
      { $set: { status } }
    );

    res.json({ message: "Order status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
