import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validateSchema(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ error: "Validation failed", details: result.error.issues });
    }

    req.body = result.data;
    next();
  };
}

export function validate(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = requiredFields.filter((field) => req.body[field] === undefined);

    if (missingFields.length > 0) {
      return res.status(400).json({ error: "Missing required fields", missingFields });
    }

    next();
  };
}
