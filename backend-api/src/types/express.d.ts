import { type TokenPayload } from "../utils/auth";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
