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
  "/:userId/address",
  validateRequest(UserUuidParamDto, ValidationType.PARAMS),
  validateRequest(CreateAddressDto),
  userAddressController.createUserAddress
);

router.get(
  "/:userId/address",
  validateRequest(UserUuidParamDto, ValidationType.PARAMS),
  validateRequest(GetAddressesQueryDto, ValidationType.QUERY),
  userAddressController.getUserAddresses
);

router.get(
  "/:userId/address/:addressId",
  validateRequest(UserUuidParamDto, ValidationType.PARAMS),
  validateRequest(AddressUuidParamDto, ValidationType.PARAMS),
  userAddressController.getUserAddressById
);

router.patch(
  "/:userId/address/:addressId",
  validateRequest(UserUuidParamDto, ValidationType.PARAMS),
  validateRequest(AddressUuidParamDto, ValidationType.PARAMS),
  validateRequest(UpdateAddressDto),
  userAddressController.updateUserAddressById
);

router.delete(
  "/:userId/address/:addressId",
  validateRequest(UserUuidParamDto, ValidationType.PARAMS),
  validateRequest(AddressUuidParamDto, ValidationType.PARAMS),
  userAddressController.deleteUserAddressById
);

export default router;
