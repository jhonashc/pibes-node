import { Router } from "express";

import { UserAddressController } from "../controllers";

import {
  CreateUserAddressDto,
  GetUserAddressesQueryDto,
  UpdateUserAddressDto,
  UserAddressUuidParamDto,
  UserUuidParamDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { validateRequest } from "../middlewares";

const router = Router();

const userAddressController = new UserAddressController();

router.post(
  "/:userId/addresses",
  validateRequest(UserUuidParamDto, ValidationType.PARAMS),
  validateRequest(CreateUserAddressDto),
  userAddressController.createUserAddress
);

router.get(
  "/:userId/addresses",
  validateRequest(UserUuidParamDto, ValidationType.PARAMS),
  validateRequest(GetUserAddressesQueryDto, ValidationType.QUERY),
  userAddressController.getUserAddresses
);

router.get(
  "/:userId/addresses/:addressId",
  validateRequest(UserAddressUuidParamDto, ValidationType.PARAMS),
  userAddressController.getUserAddress
);

router.patch(
  "/:userId/addresses/:addressId",
  validateRequest(UserAddressUuidParamDto, ValidationType.PARAMS),
  validateRequest(UpdateUserAddressDto),
  userAddressController.updateUserAddress
);

router.delete(
  "/:userId/addresses/:addressId",
  validateRequest(UserAddressUuidParamDto, ValidationType.PARAMS),
  userAddressController.deleteUserAddress
);

export default router;
