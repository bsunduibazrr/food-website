import { UserModel } from "../model/user-model.js";

export const signup = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await UserModel.create({
      email,
      password: null,
      phoneNumber: null,
      role: "user",
      orderedFoods: [],
      isVerified: false,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
