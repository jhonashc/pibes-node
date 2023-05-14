import { Router } from "express";

import { AuthController } from "../controllers";

import {
  CreateLoginDto,
  CreateRefreshTokenDto,
  CreateRegisterDto,
  CreateVerifyOtpDtp,
} from "../dtos";

import { validateRequest } from "../middlewares";

const router = Router();

const authController = new AuthController();

router.post("/login", validateRequest(CreateLoginDto), authController.login);

router.post(
  "/register",
  validateRequest(CreateRegisterDto),
  authController.register
);

router.post(
  "/verify-email",
  validateRequest(CreateVerifyOtpDtp),
  authController.verifyEmail
);

router.post(
  "/refresh-token",
  validateRequest(CreateRefreshTokenDto),
  authController.refreshToken
);

export default router;
