import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email: z.email().max(191).toLowerCase(),
  password: z.string().min(12).max(128),
  team_id: z.number().int().positive().optional(),
});

export const loginSchema = z.object({
  email: z.email().max(191).toLowerCase(),
  password: z.string().min(1).max(128),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
