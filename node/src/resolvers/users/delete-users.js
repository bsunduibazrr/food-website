import jwt from "jsonwebtoken";
import { UserModel } from "../../model/user-model.js";
export const deleteUsers = async (req, res) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, "secret-key");
    const id = req.params.id;

    await UserModel.findByIdAndDelete(id);
    res.send("user deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(401).send("unauthorized");
  }
};
