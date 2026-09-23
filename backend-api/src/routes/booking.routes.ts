import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import { auth } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();
const controller = new BookingController();

router.get("/bookings", controller.findAll);
router.get("/bookings/:id", controller.findById);
router.post("/bookings", auth, validate(["desk", "floor", "date"]), controller.create);
router.put("/bookings/:id", auth, validate(["desk", "floor", "date"]), controller.update);
router.patch("/bookings/:id", auth, controller.toggleBooked);
router.delete("/bookings/:id", auth, controller.delete);

export default router;
