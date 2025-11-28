import { UserModel } from "../../model/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const body = req.body;
  const user = await UserModel.findOne({ email: body.email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await bcrypt.compare(body.password, user.password);

  if (!result) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign(
    { email: user.email, id: user._id, role: user.role },
    "secret-key",
    {}
  );

  res.json({
    message: `User ${body.email} logged in successfully`,
    token,
  });
};
