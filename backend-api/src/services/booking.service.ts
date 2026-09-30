import { type Booking, type BookingCreateData, type BookingUpdateData } from "../models/booking.model";
import { BookingRepository } from "../repositories/booking.repository";
import { NotFoundError } from "../errors";

export class BookingService {
  constructor(private repository: BookingRepository = new BookingRepository()) {}

  findAll(): Promise<Booking[]> {
    return this.repository.findAll();
  }

  findById(id: number): Promise<Booking | null> {
    return this.repository.findById(id);
  }

  async getPaginatedShifts(page: number, limit: number): Promise<{ data: Booking[]; meta: { total: number; page: number; limit: number; totalPages: number } }> {
    const total = await this.repository.count();
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const data = await this.repository.findPaginated(skip, limit);

    return { data, meta: { total, page, limit, totalPages } };
  }

  create(booking: BookingCreateData): Promise<Booking> {
    return this.repository.create(booking);
  }

  async update(id: number, data: BookingUpdateData): Promise<Booking> {
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }

    return updated;
  }

  async delete(id: number): Promise<Booking> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }

    return deleted;
  }

  async toggleBooked(id: number): Promise<Booking | null> {
    const booking = await this.repository.findById(id);
    if (!booking) {
      return null;
    }

    return this.repository.update(id, { active: !booking.active });
  }
}
