import { type Prisma, type Booking } from "../generated/prisma/client";

export { type Booking };

export type BookingWithDesk = Prisma.BookingGetPayload<{
  include: { desk: { select: { name: true; floor: true } } };
}>;

export type BookingCreateData = Prisma.BookingCreateInput;
export type BookingUpdateData = Prisma.BookingUpdateInput;

/** Fields a client may supply; the owner is taken from the auth token. */
export type BookingInput = {
  desk_id: number;
  booking_date: Date;
  active?: boolean;
};
