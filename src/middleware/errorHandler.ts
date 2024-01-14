import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err && err.error && err.error.isJoi) {
    return res.status(400).json({
      error: "Validation Error",
      details: err.error.details.map((detail: any) => detail.message.replace(/['"]/g, ''))
    });
  } else if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandler;
