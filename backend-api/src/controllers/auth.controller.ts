import { type Request, type Response, type NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { BadRequestError, UnauthorizedError } from "../errors";
import { type User } from "../generated/prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { type LoginInput, type RegisterInput } from "../schemas/auth.schema";
import { comparePassword, generateToken, hashPassword } from "../utils/auth";

function toPublicUser(user: User) {
  const { password, ...safe } = user;
  return safe;
}

// Well-formed bcrypt hash that matches nothing; keeps login timing equal for unknown emails.
const DUMMY_HASH = "$2b$12$".padEnd(60, "x");

export class AuthController {
  constructor(private repository: UserRepository = new UserRepository()) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { first_name, last_name, email, password, team_id } = req.body as RegisterInput;

      if (await this.repository.findByEmail(email)) {
        throw new BadRequestError("Registration failed");
      }

      const user = await this.repository.create({
        first_name,
        last_name,
        email,
        password: await hashPassword(password),
        ...(team_id !== undefined ? { team_id } : {}),
      });

      res.status(HTTP_STATUS.CREATED).json({ user: toPublicUser(user), token: generateToken(user) });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as LoginInput;
      const user = await this.repository.findByEmail(email);

      // Hash a dummy value when the user is missing so timing does not reveal registered emails.
      const matches = await comparePassword(password, user?.password ?? DUMMY_HASH);

      if (!user || !matches) {
        throw new UnauthorizedError("Invalid email or password");
      }

      res.json({ user: toPublicUser(user), token: generateToken(user) });
    } catch (error) {
      next(error);
    }
  };
}
