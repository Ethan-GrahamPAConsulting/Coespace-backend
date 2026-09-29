import { type Booking } from "../models/booking.model";

export class BookingRepository {
  private bookings: Booking[] = [
    { id: 1, desk: "A1", floor: 1, date: "2026-09-22", booked: true },
    { id: 2, desk: "B3", floor: 2, date: "2026-09-23", booked: true },
    { id: 3, desk: "C5", floor: 3, date: "2026-09-24", booked: false },
    { id: 4, desk: "D2", floor: 1, date: "2026-09-25", booked: true },
    { id: 5, desk: "E4", floor: 2, date: "2026-09-26", booked: false },
    { id: 6, desk: "F6", floor: 3, date: "2026-09-27", booked: true },
    { id: 7, desk: "G1", floor: 1, date: "2026-09-28", booked: false },
    { id: 8, desk: "H3", floor: 2, date: "2026-09-29", booked: true },
  ];

  findAll(): Booking[] {
    return this.bookings;
  }

  findById(id: number): Booking | undefined {
    return this.bookings.find((booking) => booking.id === id);
  }

  findPaginated(skip: number, limit: number): Booking[] {
    return this.bookings.slice(skip, skip + limit);
  }

  count(): number {
    return this.bookings.length;
  }

  create(booking: Omit<Booking, "id">): Booking {
    const lastBooking = this.bookings[this.bookings.length - 1];
    const newId = lastBooking ? lastBooking.id + 1 : 1;

    const newBooking: Booking = { id: newId, ...booking };
    this.bookings.push(newBooking);
    return newBooking;
  }

  update(id: number, data: Partial<Omit<Booking, "id">>): Booking | undefined {
    const booking = this.findById(id);
    if (!booking) {
      return undefined;
    }

    Object.assign(booking, data);
    return booking;
  }

  delete(id: number): Booking | undefined {
    const index = this.bookings.findIndex((booking) => booking.id === id);
    if (index === -1) {
      return undefined;
    }

    const [deletedBooking] = this.bookings.splice(index, 1);
    return deletedBooking;
  }
}
