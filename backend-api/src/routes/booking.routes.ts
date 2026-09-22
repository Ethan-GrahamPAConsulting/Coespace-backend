import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";

const router = Router();
const controller = new BookingController();

router.get("/bookings", controller.findAll);
router.get("/bookings/:id", controller.findById);
router.post("/bookings", controller.create);
router.put("/bookings/:id", controller.update);
router.patch("/bookings/:id", controller.toggleBooked);
router.delete("/bookings/:id", controller.delete);

export default router;
