import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import config from "../conf/config";

export const generateToken = (user: User): string => {
  const payload = {
    userId: user.id,
    email: user.email
  };

  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "60m" });
};
