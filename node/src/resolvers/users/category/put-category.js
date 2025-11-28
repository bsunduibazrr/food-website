//update-put

import { categoryModel } from "../../../model/category-model.js";

export const putCategory = async (req, res) => {
  try {
    const filter = { name: "" };
    const update = { name: "" };

    const updatedCategory = await categoryModel.findOneAndUpdate(
      filter,
      update,
      {
        new: true,
      }
    );

    if (!updatedCategory) {
      return res.status(404).send("category with name '' not found");
    }

    res.send(`category name updated to ${updatedCategory.name}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
