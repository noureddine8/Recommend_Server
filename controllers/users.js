import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/users.js";
import { secretKey } from "../config.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const alreadyUser = await Users.findOne({ email });
    if (!alreadyUser)
      return res
        .status(404)
        .json({ message: `No user with the email ${email}` });

    const correctPassword = await bcrypt.compare(
      password,
      alreadyUser.password
    );
    if (!correctPassword)
      return res.status(404).json({ message: "The password is incorrect" });

    const token = jwt.sign({ email, id: alreadyUser._id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ user: alreadyUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log("error is : ", error);
  }
};

export const signup = async (req, res) => {
  const { firstname, lastname, email, city, password } = req.body;
  try {
    const alreadyUser = await Users.findOne({ email });
    if (alreadyUser)
      return res
        .status(404)
        .json({ message: `User with the ${email} already exists` });
    const hashed = await bcrypt.hash(password, 12);
    const name = `${firstname} ${lastname}`;
    const result = await Users.create({ name, city, email, password: hashed });
    const token = jwt.sign({ email: result.email, id: result._id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log("Error is : " + error);
  }
};
