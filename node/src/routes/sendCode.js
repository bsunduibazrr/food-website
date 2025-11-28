import express from "express";
import nodemailer from "nodemailer";

export const router = express.Router();

const verificationCodes = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "taniiemail@gmail.com",
    pass: "app_password_here",
  },
});

router.post("/send-code", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });

  const code = Math.floor(1000 + Math.random() * 9000).toString();

  verificationCodes[email] = code;

  const mailOptions = {
    from: "taniiemail@gmail.com",
    to: email,
    subject: "Your verification code",
    text: `Your 4-digit verification code is: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to send email" });
    } else {
      console.log(`Email sent to ${email}: ${code}`);
      return res.status(200).json({ message: "Code sent" });
    }
  });
});

router.post("/verify-code", (req, res) => {
  const { email, code } = req.body;
  if (!email || !code)
    return res.status(400).json({ message: "Email and code required" });

  if (verificationCodes[email] === code) {
    delete verificationCodes[email];
    return res.status(200).json({ message: "Code verified" });
  } else {
    return res.status(400).json({ message: "Invalid code" });
  }
});
