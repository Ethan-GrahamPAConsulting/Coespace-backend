import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (token === "super-secret-key") {
    return next();
  }

  res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Unauthorized" });
}
