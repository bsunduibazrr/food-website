import express from "express";
import { categoryModel } from "../model/category-model.js";

export const routerCategory = express.Router();

routerCategory.get("/", async (req, res) => {
  const categories = await categoryModel.find();
  res.json(categories);
});

routerCategory.post("/", async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName)
      return res.status(400).json({ message: "Category name required" });

    const exists = await categoryModel.findOne({ categoryName });
    if (exists)
      return res.status(400).json({ message: "Category already exists" });

    const newCategory = await categoryModel.create({ categoryName });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
