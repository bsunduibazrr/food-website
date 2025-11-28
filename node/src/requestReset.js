import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { UserModel } from "./model/user-model.js";

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ email }, "RESET_SECRET", { expiresIn: "15m" });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `Food App <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Reset your password",
      html: `
        <p>Click the link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    return res.json({ message: "Reset link sent to email" });
  } catch (err) {
    console.log("EMAIL SEND ERROR ==>", err);
    return res.status(500).json({ message: "Server error" });
  }
};
