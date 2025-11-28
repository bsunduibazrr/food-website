import { UserModel } from "../../model/user-model.js";
import bcrypt from "bcrypt";

export const postUsers = async (req, res) => {
  try {
    const { email, password, phoneNumber, address, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email, Password required" });
    }

    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber || "",
      address: address || "",
      role: role || "user",
      orderedFoods: [],
      isVerified: false,
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: user._id,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
