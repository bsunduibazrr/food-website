import express from "express";
import { foodModel } from "../model/food-model.js";
import { categoryModel } from "../model/category-model.js";

const routerFood = express.Router();

routerFood.post("/", async (req, res) => {
  try {
    const { foodName, ingredients, price, image, category } = req.body;

    if (!foodName || !price || !category)
      return res.status(400).json({ message: "Missing required fields" });

    const foundCat = await categoryModel.findById(category);
    if (!foundCat)
      return res.status(404).json({ message: "Category not found" });

    const newFood = await foodModel.create({
      foodName,
      ingredients,
      price,
      image,
      category: foundCat._id,
    });

    res.status(201).json({ food: newFood });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

routerFood.get("/", async (req, res) => {
  try {
    const foods = await foodModel.find().populate("category");
    res.status(200).json({ foods });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

routerFood.patch("/:id", async (req, res) => {
  try {
    const updatedFood = await foodModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedFood)
      return res.status(404).json({ message: "Food not found" });

    res.status(200).json({ food: updatedFood });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

routerFood.delete("/:id", async (req, res) => {
  try {
    const deleted = await foodModel.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Food not found" });

    res.status(200).json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default routerFood;
