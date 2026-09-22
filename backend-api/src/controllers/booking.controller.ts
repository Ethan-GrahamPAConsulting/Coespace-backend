import { type Request, type Response } from "express";
import { BookingService } from "../services/booking.service";

export class BookingController {
  constructor(private service: BookingService = new BookingService()) {}

  findAll = (req: Request, res: Response) => {
    res.json(this.service.findAll());
  };

  findById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const booking = this.service.findById(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(booking);
  };

  create = (req: Request, res: Response) => {
    try {
      const booking = this.service.create(req.body);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  update = (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const updated = this.service.update(id, req.body);

      if (!updated) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  delete = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = this.service.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(deleted);
  };

  toggleBooked = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = this.service.toggleBooked(id);

    if (!updated) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(updated);
  };
}
