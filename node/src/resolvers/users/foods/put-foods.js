//update-put

import { foodModel } from "../../../model/food-model.js";

export const putFoods = async (req, res) => {
  try {
    const filter = { name: "" };
    const update = { name: "" };

    const updatedFood = await foodModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!updatedFood) {
      return res.status(404).send("food with name '' not found");
    }

    res.send(`food name updated to ${updatedFood.name}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
