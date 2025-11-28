// create-post

import { foodModel } from "../../../model/food-model.js";

export const postFoods = async (req, res) => {
  const newFood = req.body;

  await foodModel.create({
    foodName: newFood.foodName,
    price: newFood.price,
    image: newFood.image,
    ingredients: newFood.ingredients,
    category: newFood.category,
    createdAt: newFood.createdAt,
    updatedAt: newFood.updatedAt,
  });
  res.status(200).json("new food added");
};
