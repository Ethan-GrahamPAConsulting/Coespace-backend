export interface Booking {
  id: number;
  desk: string;
  floor: number;
  date: string;
  active: boolean;
}

export const bookings: Booking[] = [
  { id: 1, desk: "A1", floor: 1, date: "2026-09-22", active: true },
  { id: 2, desk: "B3", floor: 2, date: "2026-09-23", active: true },
  { id: 3, desk: "C5", floor: 3, date: "2026-09-24", active: false },
];