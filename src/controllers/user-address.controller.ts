import { NextFunction, Request, Response } from "express";

import {
  CreateUserAddressDto,
  GetUserAddressesQueryDto,
  UpdateUserAddressDto,
} from "../dtos";

import { Address, User } from "../entities";
import { NotFoundException } from "../exceptions";
import { AddressService, UserAddressService, UserService } from "../services";

export class UserAddressController {
  async createUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { addressLine1, addressLine2, addressReference } =
        req.body as CreateUserAddressDto;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const createUserAddressDto: CreateUserAddressDto = {
        addressLine1,
        addressLine2,
        addressReference,
      };

      const createdUserAddress: Address =
        await UserAddressService.createUserAddress(
          userId,
          createUserAddressDto
        );

      res.status(201).json({
        status: true,
        data: createdUserAddress,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { limit, offset } = req.query as GetUserAddressesQueryDto;

      const userAddresses: Address[] =
        await UserAddressService.getUserAddresses(userId, {
          limit,
          offset,
        });

      res.json({
        status: true,
        data: userAddresses,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { addressId, userId } = req.params;

      const addressFound: Address | null = await AddressService.getAddressById(
        addressId
      );

      if (!addressFound) {
        throw new NotFoundException(
          `The address with id ${addressId} has not been found`
        );
      }

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const userAddressFound: Address | null =
        await UserAddressService.getUserAddress(addressId, userId);

      if (!userAddressFound) {
        throw new NotFoundException(
          `The user address with id ${addressId} has not been found`
        );
      }

      res.json({
        status: true,
        data: userAddressFound,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, addressId } = req.params;
      const { addressLine1, addressLine2, addressReference } =
        req.body as UpdateUserAddressDto;

      const addressFound: Address | null = await AddressService.getAddressById(
        addressId
      );

      if (!addressFound) {
        throw new NotFoundException(
          `The address with id ${addressId} has not been found`
        );
      }

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const updateUserAddressDto: UpdateUserAddressDto = {
        addressLine1,
        addressLine2,
        addressReference,
      };

      const updatedUserAddress: Address =
        await UserAddressService.updateUserAddress(
          userId,
          addressId,
          updateUserAddressDto
        );

      res.json({
        status: true,
        data: updatedUserAddress,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, addressId } = req.params;

      const addressFound: Address | null = await AddressService.getAddressById(
        addressId
      );

      if (!addressFound) {
        throw new NotFoundException(
          `The address with id ${addressId} has not been found`
        );
      }

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const userAddressFound: Address | null =
        await UserAddressService.getUserAddress(addressId, userId);

      if (!userAddressFound) {
        throw new NotFoundException(
          `The user address with id ${addressId} has not been found`
        );
      }

      const deletedUserAddress: Address =
        await UserAddressService.deleteUserAddress(addressFound);

      res.json({
        status: true,
        data: deletedUserAddress,
      });
    } catch (error) {
      next(error);
    }
  }
}
