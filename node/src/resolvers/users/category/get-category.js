import { categoryModel } from "../../../model/category-model.js";

export const getCategory = async (req, res) => {
  console.log("hiuhihi");
  const dbCategory = await categoryModel.find();
  res.status(200).json(dbCategory);
};
