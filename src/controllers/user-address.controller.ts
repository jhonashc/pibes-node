import { NextFunction, Request, Response } from "express";

import {
  CreateAddressDto,
  GetAddressesQueryDto,
  UpdateAddressDto,
} from "../dtos";
import { Address, User } from "../entities";
import { NotFoundException } from "../exceptions";
import { AddressService, UserService } from "../services";

export class UserAddressController {
  async createUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { addressLine1, addressLine2, addressReference } =
        req.body as CreateAddressDto;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const newAddress: CreateAddressDto = {
        addressLine1,
        addressLine2,
        addressReference,
        userId,
      };

      const createdAddress: Address = await AddressService.createAddress(
        newAddress
      );

      res.status(201).json({
        status: true,
        data: createdAddress,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { limit, offset } = req.query as GetAddressesQueryDto;

      const addresses: Address[] = await AddressService.getUserAddress({
        userId,
        limit,
        offset,
      });

      res.json({
        status: true,
        data: addresses,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserAddressById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, addressId } = req.params;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const addressFound: Address | null = await AddressService.getAddressById(
        addressId
      );

      if (!addressFound) {
        throw new NotFoundException(
          `The address with id ${addressId} has not been found`
        );
      }

      res.json({
        status: true,
        data: addressFound,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserAddressById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, addressId } = req.params;
      const { addressLine1, addressLine2, addressReference } =
        req.body as UpdateAddressDto;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const addressFound: Address | null = await AddressService.getAddressById(
        addressId
      );

      if (!addressFound) {
        throw new NotFoundException(
          `The address with id ${addressId} has not been found`
        );
      }

      const updateAddressDto: UpdateAddressDto = {
        addressLine1,
        addressLine2,
        addressReference,
      };

      const updatedAddress: Address = await AddressService.updateAddressById(
        addressFound,
        updateAddressDto
      );

      res.json({
        status: true,
        data: updatedAddress,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUserAddressById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, addressId } = req.params;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const addressFound: Address | null = await AddressService.getAddressById(
        addressId
      );

      if (!addressFound) {
        throw new NotFoundException(
          `The address with id ${addressId} has not been found`
        );
      }

      const deletedAddress: Address = await AddressService.deleteAddressById(
        addressFound
      );

      res.json({
        status: true,
        data: deletedAddress,
      });
    } catch (error) {
      next(error);
    }
  }
}
