import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/users.js";
import config from "config";
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const alreadyUser = await Users.findOne({ email });
    if (!alreadyUser)
      return res
        .status(400)
        .json({ message: `No user with the email ${email}` });

    const correctPassword = await bcrypt.compare(
      password,
      alreadyUser.password
    );
    if (!correctPassword)
      return res.status(400).json({ message: "The password is incorrect" });

    const token = jwt.sign({ id: alreadyUser._id }, config.get("secretKey"), {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "You are now signed in", token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log("error is : ", error);
  }
};

export const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const alreadyUser = await Users.findOne({ email });
    if (alreadyUser)
      return res
        .status(400)
        .json({ message: `User with the ${email} already exists` });
    const hashed = await bcrypt.hash(password, 12);
    const name = `${firstname} ${lastname}`;
    const createdUser = await Users.create({ name, email, password: hashed });
    const token = jwt.sign({ id: createdUser._id }, config.get("secretKey"), {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "Registration done successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log("Error is : " + error);
  }
};

export const getUser = async (req, res) => {
  const id = req.userId;
  try {
    const user = await Users.findById(id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    console.log("err : ", error);
    res.status(201).json({ message: "Couldn't load the user" });
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findById(id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    console.log("err : ", error.message);
    res.status(201).json({ message: "Couldn't load the user" });
  }
};
