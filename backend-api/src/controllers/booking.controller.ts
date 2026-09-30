import { type Request, type Response, type NextFunction } from "express";
import { BookingService } from "../services/booking.service";
import { UnauthorizedError } from "../errors";
import { HTTP_STATUS } from "../constants/httpStatus";

function requireUserId(req: Request): number {
  if (!req.user) {
    throw new UnauthorizedError("Authentication required");
  }
  return req.user.id;
}

export class BookingController {
  constructor(private service: BookingService = new BookingService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Math.max(1, Number(req.query.page) || 1);
      const requestedLimit = Math.max(1, Number(req.query.limit) || 10);
      const limit = Math.min(requestedLimit, 50);

      res.json(await this.service.getPaginatedShifts(page, limit));
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = await this.service.findById(Number(req.params.id));

      if (!booking) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req);
      const booking = await this.service.create(userId, req.body);

      res.status(HTTP_STATUS.CREATED).json(booking);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req);
      const updated = await this.service.update(userId, Number(req.params.id), req.body);

      res.json(updated);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req);
      const deleted = await this.service.delete(userId, Number(req.params.id));

      res.json(deleted);
    } catch (error) {
      next(error);
    }
  };

  toggleBooked = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req);
      const updated = await this.service.toggleBooked(userId, Number(req.params.id));

      res.json(updated);
    } catch (error) {
      next(error);
    }
  };
}
