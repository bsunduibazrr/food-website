import bcrypt from "bcrypt";
import { UserModel } from "../model/user-model.js";

export const createPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
