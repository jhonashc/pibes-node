import { Router } from "express";

import { UserController } from "../controllers";
import {
  CreateUserDto,
  GetUsersQueryDto,
  UpdateUserDto,
  UuidParamDto,
} from "../dtos";
import { ValidationType } from "../interfaces";
import { validateRequest } from "../middlewares";

const router = Router();

const userController = new UserController();

router.post("/", validateRequest(CreateUserDto), userController.createUser);

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

router.patch(
  "/:id",
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  validateRequest(UpdateUserDto),
  userController.updateUserById
);

router.delete(
  "/:id",
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  userController.deleteUserById
);

export default router;
