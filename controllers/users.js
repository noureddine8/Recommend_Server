import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/users.js";
import { secretKey } from "../config.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const alreadyUser = await Users.find({ email });
    if (!alreadyUser)
      return res
        .status(404)
        .json({ message: `No user with the email ${email}` });

    const correctPassword = bcrypt.compare(password, alreadyUser.password);
    if (!correctPassword)
      return res.status(404).json({ message: "The password is incorrect" });

    const token = jwt.sign({ email, id: alreadyUser._id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ user: alreadyUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = (req, res) => {
  const {
    firstname,
    lastname,
    email,
    city,
    password,
    confirmPassword,
  } = req.body;
};
