import mongoose from "mongoose";
import { orderModel } from "./src/model/order-model.js";

const MONGO_URI =
  "mongodb+srv://sunduibzrr:sunduibzrr@cluster0.u5fuyce.mongodb.net/";

const deleteFoodFields = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const orders = await orderModel.find({});

    for (const order of orders) {
      let updated = false;

      for (const item of order.items) {
        if (item.food) {
          delete item.food;
          updated = true;
        }
      }

      if (updated) {
        await order.save();
        console.log(`Order ${order._id} food references deleted.`);
      }
    }

    console.log("All orders updated successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error deleting food references:", err);
    process.exit(1);
  }
};

deleteFoodFields();
