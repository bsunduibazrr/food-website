import express from "express";
import cors from "cors";
import { router } from "./routes/users.js";
import mongoose from "mongoose";
import { routerCategory } from "./routes/category.js";
import routerOrder from "./routes/order.js";
import { categoryModel } from "./model/category-model.js";
import routerFood from "./routes/foods.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/users", router);
app.use("/foods", routerFood);
app.use("/order", routerOrder);
app.use("/category", routerCategory);

mongoose
  .connect("mongodb+srv://sunduibzrr:sunduibzrr@cluster0.u5fuyce.mongodb.net/")
  .then(() => console.log("connected!"));

app.listen(port, () => {
  console.log(` Server is running on http://localhost:${port}`);
});
