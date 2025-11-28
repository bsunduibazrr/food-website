import { UserModel } from "../../model/user-model.js";

export const getUsers = async (req, res) => {
  console.log("hiuhihi");
  const dbUsers = await UserModel.find();
  console.log(dbUsers);
  res.status(200).json(dbUsers);
};
