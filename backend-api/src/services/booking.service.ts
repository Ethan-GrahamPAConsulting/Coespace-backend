import { type Booking } from "../models/booking.model";
import { BookingRepository } from "../repositories/booking.repository";
import { NotFoundError } from "../errors";

export class BookingService {
  constructor(private repository: BookingRepository = new BookingRepository()) {}

  findAll(): Booking[] {
    return this.repository.findAll();
  }

  findById(id: number): Booking | undefined {
    return this.repository.findById(id);
  }

  getPaginatedShifts(page: number, limit: number): { data: Booking[]; meta: { total: number; page: number; limit: number; totalPages: number } } {
    const total = this.repository.count();
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const data = this.repository.findPaginated(skip, limit);

    return { data, meta: { total, page, limit, totalPages } };
  }

  create(booking: Omit<Booking, "id">): Booking {
    if (booking.desk.length < 3) {
      throw new Error("Desk name must be at least 3 characters long");
    }

    return this.repository.create(booking);
  }

  update(id: number, data: Partial<Omit<Booking, "id">>): Booking {
    if (data.desk !== undefined && data.desk.length < 3) {
      throw new Error("Desk name must be at least 3 characters long");
    }

    const updated = this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }

    return updated;
  }

  delete(id: number): Booking {
    const deleted = this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }

    return deleted;
  }

  toggleBooked(id: number): Booking | undefined {
    const booking = this.repository.findById(id);
    if (!booking) {
      return undefined;
    }

    return this.repository.update(id, { booked: !booking.booked });
  }
}
