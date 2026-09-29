import { AppError } from "../utils/appError";

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}