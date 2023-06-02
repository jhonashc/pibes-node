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
      const { name, sideStreet, deliveryInstruction } =
        req.body as CreateUserAddressDto;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `El usuario con id ${userId} no ha sido encontrado`
        );
      }

      const createUserAddressDto: CreateUserAddressDto = {
        name,
        sideStreet,
        deliveryInstruction,
      };

      const createdUserAddress: Address =
        await UserAddressService.createUserAddress(
          userId,
          createUserAddressDto
        );

      res.status(201).json({
        status: true,
        message: "La dirección ha sido creada con éxito",
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
          `La dirección con id ${addressId} no ha sido encontrada`
        );
      }

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `El usuario con id ${userId} no ha sido encontrado`
        );
      }

      const userAddressFound: Address | null =
        await UserAddressService.getUserAddress(addressId, userId);

      if (!userAddressFound) {
        throw new NotFoundException(
          `La dirección de usuario con id ${addressId} no ha sido encontrada`
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
      const { name, sideStreet, deliveryInstruction } =
        req.body as UpdateUserAddressDto;

      const addressFound: Address | null = await AddressService.getAddressById(
        addressId
      );

      if (!addressFound) {
        throw new NotFoundException(
          `La dirección con id ${addressId} no ha sido encontrada`
        );
      }

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `El usuario con id ${userId} no ha sido encontrado`
        );
      }

      const updateUserAddressDto: UpdateUserAddressDto = {
        name,
        sideStreet,
        deliveryInstruction,
      };

      const updatedUserAddress: Address =
        await UserAddressService.updateUserAddress(
          userId,
          addressId,
          updateUserAddressDto
        );

      res.json({
        status: true,
        message: "La dirección ha sido actualizada con éxito",
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
          `La dirección con id ${addressId} no ha sido encontrada`
        );
      }

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `El usuario con id ${userId} no ha sido encontrado`
        );
      }

      const userAddressFound: Address | null =
        await UserAddressService.getUserAddress(addressId, userId);

      if (!userAddressFound) {
        throw new NotFoundException(
          `La dirección de usuario con id ${addressId} no ha sido encontrada`
        );
      }

      const deletedUserAddress: Address =
        await UserAddressService.deleteUserAddress(addressFound);

      res.json({
        status: true,
        message: "La dirección ha sido eliminada con éxito",
        data: deletedUserAddress,
      });
    } catch (error) {
      next(error);
    }
  }
}
