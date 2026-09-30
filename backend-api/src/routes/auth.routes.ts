import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateSchema } from "../middleware/validate";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const router = Router();
const controller = new AuthController();

router.post("/auth/register", validateSchema(registerSchema), controller.register);
router.post("/auth/login", validateSchema(loginSchema), controller.login);

export default router;
