import { Router } from "express";

import { AuthController } from "../controllers";
import { CreateLoginDto, CreateRegisterDto } from "../dtos";
import { validateRequest } from "../middlewares";

const router = Router();

const authController = new AuthController();

router.post("/login", validateRequest(CreateLoginDto), authController.login);

router.post(
  "/register",
  validateRequest(CreateRegisterDto),
  authController.register
);

export default router;
