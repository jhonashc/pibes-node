import { Router } from "express";

import { UserAddressController } from "../controllers";

import {
  AddressUuidParamDto,
  CreateAddressDto,
  GetAddressesQueryDto,
  UpdateAddressDto,
  UserUuidParamDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { validateRequest } from "../middlewares";

const router = Router();

const userAddressController = new UserAddressController();

router.post(
  "/:userId/addresses",
  validateRequest(UserUuidParamDto, ValidationType.PARAMS),
  validateRequest(CreateAddressDto),
  userAddressController.createUserAddress
);

router.get(
  "/:userId/addresses",
  validateRequest(UserUuidParamDto, ValidationType.PARAMS),
  validateRequest(GetAddressesQueryDto, ValidationType.QUERY),
  userAddressController.getUserAddresses
);

router.get(
  "/:userId/addresses/:addressId",
  validateRequest(UserUuidParamDto, ValidationType.PARAMS),
  validateRequest(AddressUuidParamDto, ValidationType.PARAMS),
  userAddressController.getUserAddressById
);

router.patch(
  "/:userId/addresses/:addressId",
  validateRequest(UserUuidParamDto, ValidationType.PARAMS),
  validateRequest(AddressUuidParamDto, ValidationType.PARAMS),
  validateRequest(UpdateAddressDto),
  userAddressController.updateUserAddressById
);

router.delete(
  "/:userId/addresses/:addressId",
  validateRequest(UserUuidParamDto, ValidationType.PARAMS),
  validateRequest(AddressUuidParamDto, ValidationType.PARAMS),
  userAddressController.deleteUserAddressById
);

export default router;
