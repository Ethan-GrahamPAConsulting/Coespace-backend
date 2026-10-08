import { Router } from "express";
import { DeskController } from "../controllers/desk.controller";

const router = Router();
const controller = new DeskController();

router.get("/desks", controller.findAll);

export default router;