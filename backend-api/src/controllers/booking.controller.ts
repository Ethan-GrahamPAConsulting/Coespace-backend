import { type Request, type Response } from "express";
import { BookingService } from "../services/booking.service";
import { NotFoundError } from "../errors";
import { HTTP_STATUS } from "../constants/httpStatus";

export class BookingController {
  constructor(private service: BookingService = new BookingService()) {}

  findAll = async (req: Request, res: Response) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const requestedLimit = Math.max(1, Number(req.query.limit) || 10);
    const limit = Math.min(requestedLimit, 50);

    res.json(await this.service.getPaginatedShifts(page, limit));
  };

  findById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const booking = await this.service.findById(id);

    if (!booking) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Booking not found" });
    }

    res.json(booking);
  };

  create = async (req: Request, res: Response) => {
    try {
      const booking = await this.service.create(req.body);
      res.status(HTTP_STATUS.CREATED).json(booking);
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: (error as Error).message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const updated = await this.service.update(id, req.body);

      res.json(updated);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ error: error.message });
      }
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: (error as Error).message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const deleted = await this.service.delete(id);

      res.json(deleted);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ error: error.message });
      }
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: (error as Error).message });
    }
  };

  toggleBooked = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = await this.service.toggleBooked(id);

    if (!updated) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Booking not found" });
    }

    res.json(updated);
  };
}
