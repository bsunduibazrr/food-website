import { categoryModel } from "../../../model/category-model.js";

export const deleteCategory = async (req, res) => {
  const deletel = req.body;
  await categoryModel.findByIdAndDelete(deletel.id);
  res.send("category deleted successfully");
};
