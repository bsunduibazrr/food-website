import { foodModel } from "../../../model/food-model.js";

export const getFoodsByCategory = async (req, res) => {
  try {
    const dbFoods = await foodModel.find({ category: req.params.id });

    res.status(200).json(dbFoods);
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error: error.message });
  }
};
