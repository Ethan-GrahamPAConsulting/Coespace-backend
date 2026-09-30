import { Prisma } from "../generated/prisma/client";
import { type Booking, type BookingCreateData, type BookingUpdateData } from "../models/booking.model";
import { prisma } from "../utils/prisma";

// Prisma raises this code when a where clause matches no row.
const RECORD_NOT_FOUND = "P2025";

export class BookingRepository {
  findAll(): Promise<Booking[]> {
    return prisma.booking.findMany({ orderBy: { id: "asc" } });
  }

  findById(id: number): Promise<Booking | null> {
    return prisma.booking.findUnique({ where: { id } });
  }

  findPaginated(skip: number, limit: number): Promise<Booking[]> {
    return prisma.booking.findMany({ skip, take: limit, orderBy: { id: "asc" } });
  }

  count(): Promise<number> {
    return prisma.booking.count();
  }

  create(data: BookingCreateData): Promise<Booking> {
    return prisma.booking.create({ data });
  }

  async update(id: number, data: BookingUpdateData): Promise<Booking | null> {
    try {
      return await prisma.booking.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === RECORD_NOT_FOUND) {
        return null;
      }
      throw error;
    }
  }

  async delete(id: number): Promise<Booking | null> {
    try {
      return await prisma.booking.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === RECORD_NOT_FOUND) {
        return null;
      }
      throw error;
    }
  }
}
