import express, { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../../../services/authService";
import validator from "../../../middleware/validateRequest";
import { registerSchema, loginSchema } from "../../../validators/userValidator";
import { addToBlacklist, isTokenBlacklisted } from "../../../utils/tokenBlacklist";

const router = express.Router();

router.post(
  "/register",
  validator.body(registerSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await registerUser(req.body);
      res.status(200).json({ message: "User successfully" });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  validator.body(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await loginUser(req.body);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/logout", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No authorization token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Invalid authorization format" });
  }

  if (isTokenBlacklisted(token)) {
    return res.status(400).json({ error: "Token already invalidated" });
  }

  addToBlacklist(token);
  res.status(200).json({ message: "Logout successful, token invalidated" });
});

export default router;
