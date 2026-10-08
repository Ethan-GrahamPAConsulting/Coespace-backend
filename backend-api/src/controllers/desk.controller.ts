import { type Request, type Response, type NextFunction } from "express";
import { DeskRepository } from "../repositories/desk.repository";

export class DeskController {
  constructor(private repository: DeskRepository = new DeskRepository()) {}

  findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await this.repository.findAll());
    } catch (error) {
      next(error);
    }
  };
}