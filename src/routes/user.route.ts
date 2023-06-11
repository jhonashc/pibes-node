import { Router } from "express";

import { UserController } from "../controllers";

import {
  CreateUserDto,
  GetUsersQueryDto,
  IdParamDto,
  SearchUsersQueryDto,
  UpdateUserDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { uploader, validateRequest } from "../middlewares";

const router = Router();

const userController = new UserController();

router.post(
  "/",
  uploader.single("file"),
  validateRequest(CreateUserDto),
  userController.createUser
);

router.get(
  "/",
  validateRequest(GetUsersQueryDto, ValidationType.QUERY),
  userController.getUsers
);

router.get(
  "/search",
  validateRequest(SearchUsersQueryDto, ValidationType.QUERY),
  userController.searchUsers
);

router.get(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  userController.getUserById
);

router.patch(
  "/:id",
  uploader.single("file"),
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
