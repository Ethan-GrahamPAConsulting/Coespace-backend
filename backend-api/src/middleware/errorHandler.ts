import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../utils/appError";
import { HTTP_STATUS } from "../constants/httpStatus";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError && err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error(err);
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "Something went wrong on our end!"
  });
}
