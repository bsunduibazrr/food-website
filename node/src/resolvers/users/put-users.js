//update-put
import { UserModel } from "../../model/user-model.js";

export const putUsers = async (req, res) => {
  try {
    const filter = { name: "sundui" };
    const update = { name: "bazar" };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send("User with name 'sundui' not found");
    }

    res.send(`User name updated to ${updatedUser.name}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
