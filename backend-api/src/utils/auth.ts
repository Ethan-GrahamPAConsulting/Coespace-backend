import "dotenv/config";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { type User } from "../generated/prisma/client";

const SALT_ROUNDS = 12;
const TOKEN_EXPIRES_IN = "1h";

function requireJwtSecret(): string {
  const secret = process.env["JWT_SECRET"];
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is missing");
  }
  return secret;
}

const jwtSecret: string = requireJwtSecret();

export interface TokenPayload extends JwtPayload {
  sub: string;
  id: number;
  email: string;
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(user: Pick<User, "id" | "email">): string {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    subject: String(user.id),
    expiresIn: TOKEN_EXPIRES_IN,
  });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (
      typeof decoded === "string" ||
      typeof decoded.sub !== "string" ||
      typeof decoded["id"] !== "number" ||
      typeof decoded["email"] !== "string"
    ) {
      return null;
    }
    return decoded as TokenPayload;
  } catch {
    return null;
  }
}
