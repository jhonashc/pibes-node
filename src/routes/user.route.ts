import { Router } from "express";

import { UserController } from "../controllers";
import { GetUsersQueryDto, UuidParamDto } from "../dtos";
import { ValidationType } from "../interfaces";
import { validateRequest } from "../middlewares";

const router = Router();

const userController = new UserController();

router.get(
  "/",
  validateRequest(GetUsersQueryDto, ValidationType.QUERY),
  userController.getUsers
);

router.get(
  "/:id",
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  userController.getUserById
);

export default router;
