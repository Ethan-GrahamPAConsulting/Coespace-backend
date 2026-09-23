import { Request, Response, NextFunction } from "express";

export function validate(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = requiredFields.filter((field) => req.body[field] === undefined);

    if (missingFields.length > 0) {
      return res.status(400).json({ error: "Missing required fields", missingFields });
    }

    next();
  };
}
