export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const decoded = jwt.verify(token, "RESET_SECRET");
    const email = decoded.email;

    await UserModel.findOneAndUpdate({ email }, { password });

    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
