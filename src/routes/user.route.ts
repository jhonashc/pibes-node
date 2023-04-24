import { Router } from "express";

import { UserController } from "../controllers";

import {
  CreateUserDto,
  GetUsersQueryDto,
  IdParamDto,
  UpdateUserDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { uploader, validateRequest } from "../middlewares";

const router = Router();

const userController = new UserController();

router.post(
  "/",
  uploader.single("avatarUrl"),
  validateRequest(CreateUserDto),
  userController.createUser
);

router.get(
  "/",
  validateRequest(GetUsersQueryDto, ValidationType.QUERY),
  userController.getUsers
);

router.get(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  userController.getUserById
);

router.patch(
  "/:id",
  uploader.single("avatarUrl"),
  validateRequest(IdParamDto, ValidationType.PARAMS),
  validateRequest(UpdateUserDto),
  userController.updateUserById
);

router.delete(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  userController.deleteUserById
);

export default router;
