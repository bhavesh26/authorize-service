import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!
export const signAccessToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });