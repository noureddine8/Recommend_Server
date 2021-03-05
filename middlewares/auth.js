import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

export const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let decoded;
  if (!token) res.status(401).json({ message: "No token" });
  try {
    decoded = jwt.verify(token, secretKey);
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    console.log(error);
  }
};
