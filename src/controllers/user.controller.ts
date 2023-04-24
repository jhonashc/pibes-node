import { NextFunction, Request, Response } from "express";

import { CreateUserDto, GetUsersQueryDto, UpdateUserDto } from "../dtos";
import { Roles, User } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { deleteFile } from "../helpers";
import { UserService } from "../services";

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file as Express.Multer.File;
      const { person, username, email, password, roles } =
        req.body as CreateUserDto;

      let avatarUrl = file && file.path;

      if (avatarUrl) await deleteFile(avatarUrl);

      const filteredUsername: string = username.trim().toLowerCase();
      const filteredEmail: string = email.trim().toLowerCase();

      const userByUsernameFound: User | null =
        await UserService.getUserByUsername(filteredUsername);

      const userByEmailFound: User | null = await UserService.getUserByEmail(
        filteredEmail
      );

      if (userByUsernameFound || userByEmailFound) {
        throw new ConflictException(
          `The user with the username ${filteredUsername} or the email ${filteredEmail} already exists`
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
        username: filteredUsername,
        email: filteredEmail,
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
      const file = req.file as Express.Multer.File;
      const { person, username, roles } = req.body as UpdateUserDto;

      let avatarUrl = file && file.path;

      if (avatarUrl) await deleteFile(avatarUrl);

      const filteredUsername: string | undefined = username
        ?.trim()
        .toLowerCase();

      const userFound: User | null = await UserService.getUserById(id);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${id} has not been found`
        );
      }

      if (userFound.username.toLowerCase() == filteredUsername) {
        throw new ConflictException(
          `The user with the username ${filteredUsername} already exists`
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
