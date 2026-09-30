import { type Request, type Response, type NextFunction } from "express";
import { UnauthorizedError } from "../errors";
import { verifyToken } from "../utils/auth";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    throw new UnauthorizedError("Missing or malformed Authorization header");
  }

  const payload = verifyToken(header.slice("Bearer ".length).trim());
  if (!payload) {
    throw new UnauthorizedError("Invalid or expired token");
  }

  req.user = payload;
  next();
}
