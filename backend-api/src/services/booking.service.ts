import { type Booking, type BookingInput, type BookingWithDesk } from "../models/booking.model";
import { BookingRepository } from "../repositories/booking.repository";
import { ForbiddenError, NotFoundError } from "../errors";

export class BookingService {
  constructor(private repository: BookingRepository = new BookingRepository()) {}

  findAll(): Promise<Booking[]> {
    return this.repository.findAll();
  }

  findById(id: number): Promise<Booking | null> {
    return this.repository.findById(id);
  }

  async getPaginatedShifts(page: number, limit: number): Promise<{ data: BookingWithDesk[]; meta: { total: number; page: number; limit: number; totalPages: number } }> {
    const total = await this.repository.count();
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const data = await this.repository.findPaginated(skip, limit);

    return { data, meta: { total, page, limit, totalPages } };
  }

  create(userId: number, booking: BookingInput): Promise<BookingWithDesk> {
    return this.repository.create({
      booking_date: booking.booking_date,
      ...(booking.active !== undefined ? { active: booking.active } : {}),
      desk: { connect: { id: booking.desk_id } },
      user: { connect: { id: userId } },
    });
  }

  async update(userId: number, id: number, data: Partial<BookingInput>): Promise<Booking> {
    await this.requireOwned(userId, id);

    const updated = await this.repository.update(id, {
      ...(data.booking_date !== undefined ? { booking_date: data.booking_date } : {}),
      ...(data.active !== undefined ? { active: data.active } : {}),
      ...(data.desk_id !== undefined ? { desk: { connect: { id: data.desk_id } } } : {}),
    });

    if (!updated) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }

    return updated;
  }

  async delete(userId: number, id: number): Promise<Booking> {
    await this.requireOwned(userId, id);

    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }

    return deleted;
  }

  async toggleBooked(userId: number, id: number): Promise<Booking | null> {
    const booking = await this.requireOwned(userId, id);

    return this.repository.update(id, { active: !booking.active });
  }

  private async requireOwned(userId: number, id: number): Promise<Booking> {
    const booking = await this.repository.findById(id);
    if (!booking) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }
    if (booking.user_id !== userId) {
      throw new ForbiddenError("You do not have permission to modify this booking");
    }

    return booking;
  }
}
