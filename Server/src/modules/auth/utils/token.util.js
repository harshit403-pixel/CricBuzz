import jwt from "jsonwebtoken";
import env from "../../../config/env.js";

export const signToken = (payload, expiry) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: expiry });
};
