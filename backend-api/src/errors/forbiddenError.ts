import { AppError } from "../utils/appError";

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}