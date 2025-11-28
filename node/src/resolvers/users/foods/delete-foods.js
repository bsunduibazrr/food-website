import { foodModel } from "../../../model/food-model.js";

export const deleteFoods = async (req, res) => {
  const deletel = req.body;
  await foodModel.findByIdAndDelete(deletel.id);
  res.send("food deleted successfully");
};
