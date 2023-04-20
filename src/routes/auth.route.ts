import { Router } from "express";

import { AuthController } from "../controllers";
import { CreateLoginDto } from "../dtos";
import { validateRequest } from "../middlewares";

const router = Router();

const authController = new AuthController();

router.post("/login", validateRequest(CreateLoginDto), authController.login);

export default router;
