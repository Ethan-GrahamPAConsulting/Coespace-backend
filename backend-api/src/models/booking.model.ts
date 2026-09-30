import { type Prisma, type Booking } from "../generated/prisma/client";

export { type Booking };

export type BookingCreateData = Prisma.BookingUncheckedCreateInput;
export type BookingUpdateData = Prisma.BookingUncheckedUpdateInput;
