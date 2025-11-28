import express from "express";
import { getUsers } from "../resolvers/users/get-users.js";
import { postUsers } from "../resolvers/users/post-users.js";
import { putUsers } from "../resolvers/users/put-users.js";
import { deleteUsers } from "../resolvers/users/delete-users.js";
import { login } from "../resolvers/users/login.js";
import { signup } from "./signup.js";
import { createPassword } from "./createPass.js";
import { requestPasswordReset } from "../requestReset.js";
import { resetPassword } from "../resetPassword.js";

export const router = express.Router();

router.get("/", getUsers);
router.post("/", postUsers);
router.put("/", putUsers);
router.post("/login", login);
router.post("/signup", signup);
router.delete("/:id", deleteUsers);
router.post("/requestReset", requestPasswordReset);
router.post("/resetPassword", resetPassword);
router.post("/createPass", createPassword);
