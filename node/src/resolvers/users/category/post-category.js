// create-post

import { categoryModel } from "../../../model/category-model.js";
import { routerCategory } from "../../../routes/category.js";

export const postCategory = async (req, res) => {
  const create = req.body;
  await categoryModel.create({
    categoryName: create.categoryName,
    createdAt: create.createdAt,
    updatedAt: create.updatedAt,
  });
  res.status(200).json("new category added");
};

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
