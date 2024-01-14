import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../conf/config";
import { isTokenBlacklisted } from "../utils/tokenBlacklist";
import { JwtPayload } from "../types/authTypes";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "Access denied, token missing!" });
  }

  if (isTokenBlacklisted(token)) {
    return res.status(401).send({ error: "Access denied, token invalidated!" });
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: "Invalid or expired token" });
    }

    const userPayload = decoded as JwtPayload;

    req.body.userId = userPayload.userId;
    next();
  });
};
