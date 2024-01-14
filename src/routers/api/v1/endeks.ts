import express, { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../../../middleware/authenticateToken";
import { endeksCreate, endeksDelete } from "../../../services/endeksService";
import validator from "../../../middleware/validateRequest";
import { endeksSchema } from "../../../validators/endeksValidator";

const router = express.Router();

router.post(
  "/endeks",
  authenticateToken,
  validator.body(endeksSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await endeksCreate(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/endeks/:id",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const endeksId = parseInt(req.params.id);
      if (isNaN(endeksId)) {
        return res.status(400).json({ error: "Invalid endeks ID" });
      }
      await endeksDelete(endeksId);
      res.status(200).json({ message: "Endeks successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
