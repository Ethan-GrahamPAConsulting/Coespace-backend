import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import { requireAuth } from "../middleware/requireAuth";
import { validateSchema } from "../middleware/validate";
import { createBookingSchema, updateBookingSchema } from "../schemas/booking.schema";

const router = Router();
const controller = new BookingController();

router.get("/bookings", controller.findAll);
router.get("/bookings/:id", controller.findById);
router.post("/bookings", requireAuth, validateSchema(createBookingSchema), controller.create);
router.put("/bookings/:id", requireAuth, validateSchema(updateBookingSchema), controller.update);
router.patch("/bookings/:id", requireAuth, controller.toggleBooked);
router.delete("/bookings/:id", requireAuth, controller.delete);

export default router;
