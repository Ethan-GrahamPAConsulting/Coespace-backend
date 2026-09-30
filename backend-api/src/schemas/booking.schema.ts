import { z } from "zod";

// user_id is never accepted from the client; it comes from the auth token.
export const createBookingSchema = z.object({
  desk_id: z.number().int().positive(),
  booking_date: z.coerce.date(),
  active: z.boolean().optional(),
});

export const updateBookingSchema = createBookingSchema.partial();
