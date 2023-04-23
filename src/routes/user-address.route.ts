import { Router } from "express";

import { UserAddressController } from "../controllers";

import {
  CreateUserAddressDto,
  GetUserAddressesQueryDto,
  UpdateUserAddressDto,
  UserAddressIdParamDto,
  UserIdParamDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { validateRequest } from "../middlewares";

const router = Router();

const userAddressController = new UserAddressController();

router.post(
  "/:userId/addresses",
  validateRequest(UserIdParamDto, ValidationType.PARAMS),
  validateRequest(CreateUserAddressDto),
  userAddressController.createUserAddress
);

router.get(
  "/:userId/addresses",
  validateRequest(UserIdParamDto, ValidationType.PARAMS),
  validateRequest(GetUserAddressesQueryDto, ValidationType.QUERY),
  userAddressController.getUserAddresses
);

router.get(
  "/:userId/addresses/:addressId",
  validateRequest(UserAddressIdParamDto, ValidationType.PARAMS),
  userAddressController.getUserAddress
);

router.patch(
  "/:userId/addresses/:addressId",
  validateRequest(UserAddressIdParamDto, ValidationType.PARAMS),
  validateRequest(UpdateUserAddressDto),
  userAddressController.updateUserAddress
);

router.delete(
  "/:userId/addresses/:addressId",
  validateRequest(UserAddressIdParamDto, ValidationType.PARAMS),
  userAddressController.deleteUserAddress
);

export default router;
