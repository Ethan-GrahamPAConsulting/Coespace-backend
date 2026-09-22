import { Router, type Request, type Response } from "express";
import { bookings, type Booking } from "../bookings";

const router = Router();

router.get("/bookings", (req: Request, res: Response) => {
  res.json(bookings);
});

router.get("/bookings/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  res.json(booking);
});

router.post("/bookings", (req: Request, res: Response) => {
  const { desk, floor, date, active } = req.body;

  const lastBooking = bookings[bookings.length - 1];
  const newId = lastBooking ? lastBooking.id + 1 : 1;

  const newBooking: Booking = {
    id: newId,
    desk,
    floor,
    date,
    active,
  };

  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

router.put("/bookings/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const bookingIndex = bookings.findIndex((booking) => booking.id === id);

  if (bookingIndex === -1) {
    return res.status(404).json({ error: "Booking not found" });
  }

  const { desk, floor, date, active } = req.body;
  const replacement: Booking = { id, desk, floor, date, active };
  bookings[bookingIndex] = replacement;

  res.json(replacement);
});

router.patch("/bookings/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const booking = bookings.find((booking) => booking.id === id);

  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  booking.active = !booking.active;
  res.json(booking);
});

router.delete("/bookings/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const bookingIndex = bookings.findIndex((booking) => booking.id === id);

  if (bookingIndex === -1) {
    return res.status(404).json({ error: "Booking not found" });
  }

  const [deletedBooking] = bookings.splice(bookingIndex, 1);
  res.json(deletedBooking);
});

export default router;