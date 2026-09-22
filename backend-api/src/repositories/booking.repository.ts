import { type Booking } from "../models/booking.model";

export class BookingRepository {
  private bookings: Booking[] = [
    { id: 1, desk: "A1", floor: 1, date: "2026-09-22", booked: true },
    { id: 2, desk: "B3", floor: 2, date: "2026-09-23", booked: true },
    { id: 3, desk: "C5", floor: 3, date: "2026-09-24", booked: false },
  ];

  findAll(): Booking[] {
    return this.bookings;
  }

  findById(id: number): Booking | undefined {
    return this.bookings.find((booking) => booking.id === id);
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
