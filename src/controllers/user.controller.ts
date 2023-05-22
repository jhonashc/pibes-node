import { NextFunction, Request, Response } from "express";

import {
  CreateUserDto,
  GetUsersQueryDto,
  SearchUsersQueryDto,
  UpdateUserDto,
} from "../dtos";

import { Roles, User } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { UserService } from "../services";

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { person, username, email, password, avatarUrl, roles } =
        req.body as CreateUserDto;

      const filteredUsername: string = username.trim().toLowerCase();
      const filteredEmail: string = email.trim().toLowerCase();

      const userByUsernameFound: User | null =
        await UserService.getUserByUsername(filteredUsername);

      const userByEmailFound: User | null = await UserService.getUserByEmail(
        filteredEmail
      );

      if (userByUsernameFound) {
        throw new ConflictException(
          `El usuario con el nombre de usuario ${filteredUsername} ya existe`
        );
      }

      if (userByEmailFound) {
        throw new ConflictException(
          `El usuario con el correo electrónico ${filteredEmail} ya existe`
        );
      }

      const areTheRolesValid: boolean | undefined = roles?.every(
        (role) => Roles[role]
      );

      if (!areTheRolesValid && areTheRolesValid !== undefined) {
        throw new ConflictException(
          `Debe ingresar roles válidos [${Object.values(Roles)}]`
        );
      }

      const createUserDto: CreateUserDto = {
        person,
        username: filteredUsername,
        email: filteredEmail,
        password,
        avatarUrl,
        roles,
      };

      const createdUser: User = await UserService.createUser(createUserDto);

      res.status(201).json({
        status: true,
        message: "El usuario ha sido creado con éxito",
        data: createdUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset } = req.query as GetUsersQueryDto;

      const users: User[] = await UserService.getUsers({
        limit,
        offset,
      });

      res.json({
        status: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async searchUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, limit, offset } = req.query as SearchUsersQueryDto;

      const users: User[] = await UserService.searchUsers({
        username,
        limit,
        offset,
      });

      res.json({
        status: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userFound: User | null = await UserService.getUserById(id);

      if (!userFound) {
        throw new NotFoundException(
          `El usuario con id ${id} no ha sido encontrado`
        );
      }

      res.json({
        status: true,
        data: userFound,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { person, username, avatarUrl, roles } = req.body as UpdateUserDto;

      const filteredUsername: string | undefined = username
        ?.trim()
        .toLowerCase();

      const userFound: User | null = await UserService.getUserById(id);

      if (!userFound) {
        throw new NotFoundException(
          `El usuario con id ${id} no ha sido encontrado`
        );
      }

      if (userFound.username.toLowerCase() == filteredUsername) {
        throw new ConflictException(
          `El usuario con nombre usuario ${filteredUsername} ya existe`
        );
      }

      const areTheRolesValid: boolean | undefined = roles?.every(
        (role) => Roles[role]
      );

      if (!areTheRolesValid && areTheRolesValid !== undefined) {
        throw new ConflictException(
          `Debe ingresar roles válidos [${Object.values(Roles)}]`
        );
      }

      const updateUserDto: UpdateUserDto = {
        person,
        username: filteredUsername,
        avatarUrl,
        roles,
      };

      const updatedUser: User = await UserService.updateUserById(
        userFound,
        updateUserDto
      );

      res.json({
        status: true,
        message: "El usuario ha sido actualizado con éxito",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userFound: User | null = await UserService.getUserById(id);

      if (!userFound) {
        throw new NotFoundException(
          `El usuario con id ${id} no ha sido encontrado`
        );
      }

      await UserService.deleteUserById(userFound);

      res.json({
        status: true,
        message: "El usuario ha sido eliminado con éxito",
        data: userFound,
      });
    } catch (error) {
      next(error);
    }
  }
}
