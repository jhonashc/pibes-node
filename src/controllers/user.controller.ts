import { NextFunction, Request, Response } from "express";

import { CreateUserDto, GetUsersQueryDto, UpdateUserDto } from "../dtos";
import { Roles, User } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { UserService } from "../services";

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { person, username, email, password, avatarUrl, roles } =
        req.body as CreateUserDto;

      const lowerCaseEmail: string = email.trim().toLowerCase();

      const userFound: User | null = await UserService.getUserByEmail(
        lowerCaseEmail
      );

      if (userFound) {
        throw new ConflictException(
          `The user with the email ${lowerCaseEmail} already exists`
        );
      }

      const areTheRolesValid: boolean | undefined = roles?.every(
        (role) => Roles[role]
      );

      if (!areTheRolesValid && areTheRolesValid !== undefined) {
        throw new NotFoundException(
          `You must enter valid roles [${Object.values(Roles)}]`
        );
      }

      const createUserDto: CreateUserDto = {
        person,
        username,
        email: lowerCaseEmail,
        password,
        avatarUrl,
        roles,
      };

      const createdUser: User = await UserService.createUser(createUserDto);

      res.status(201).json({
        status: true,
        data: createdUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, limit, offset } = req.query as GetUsersQueryDto;

      const users: User[] = await UserService.getUsers({
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
          `The user with id ${id} has not been found`
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

      const userFound: User | null = await UserService.getUserById(id);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${id} has not been found`
        );
      }

      const areTheRolesValid: boolean | undefined = roles?.every(
        (role) => Roles[role]
      );

      if (!areTheRolesValid && areTheRolesValid !== undefined) {
        throw new NotFoundException(
          `You must enter valid roles [${Object.values(Roles)}]`
        );
      }

      const updateUserDto: UpdateUserDto = {
        person,
        username,
        avatarUrl,
        roles,
      };

      const updatedUser: User = await UserService.updateUserById(
        userFound,
        updateUserDto
      );

      res.json({
        status: true,
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
          `The user with id ${id} has not been found`
        );
      }

      await UserService.deleteUserById(userFound);

      res.json({
        status: true,
        data: userFound,
      });
    } catch (error) {
      next(error);
    }
  }
}
