import jwt from "jsonwebtoken";
import config from "config";

export const auth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) res.status(401).json({ message: "No Authorization " });
  const token = authorization.split(" ")[1];
  let decoded;
  if (!token) res.status(401).json({ message: "No token" });
  try {
    decoded = jwt.verify(token, config.get("secretKey"));
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Token not valid" });
  }
};
export default auth;
