import { NextFunction, Request, Response } from "express";

import { CreateUserDto, GetUsersQueryDto, UpdateUserDto } from "../dtos";
import { Gender, Roles, User } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { GenderService, UserService } from "../services";

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        firstName,
        lastName,
        telephone,
        genderId,
        username,
        email,
        password,
        avatarUrl,
        roles,
      } = req.body as CreateUserDto;

      const lowerCaseEmail: string = email.trim().toLowerCase();

      const userFound: User | null = await UserService.getUserByEmail(
        lowerCaseEmail
      );

      if (userFound) {
        throw new ConflictException(
          `The user with the email ${lowerCaseEmail} already exists`
        );
      }

      const genderFound: Gender | null = await GenderService.getGenderById(
        genderId
      );

      if (!genderFound) {
        throw new NotFoundException(
          `The gender with id ${genderId} has not been found`
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

      const createdUserDto: CreateUserDto = {
        firstName,
        lastName,
        telephone,
        genderId,
        username,
        email: lowerCaseEmail,
        password,
        avatarUrl,
        roles: roles?.length ? roles : [Roles.USER],
      };

      const createdUser: User | undefined = await UserService.createUser(
        createdUserDto
      );

      if (!createdUser) {
        throw new ConflictException("There was a problem creating the user");
      }

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
      const {
        firstName,
        lastName,
        telephone,
        genderId,
        username,
        email,
        password,
        avatarUrl,
        roles,
      } = req.body as UpdateUserDto;

      const userFound: User | null = await UserService.getUserById(id);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${id} has not been found`
        );
      }

      if (genderId) {
        const genderFound: Gender | null = await GenderService.getGenderById(
          genderId
        );

        if (!genderFound) {
          throw new NotFoundException(
            `The gender with id ${genderId} has not been found`
          );
        }
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
        firstName,
        lastName,
        telephone,
        genderId,
        username,
        email,
        password,
        avatarUrl,
        roles: roles?.length ? roles : [Roles.USER],
      };

      const updatedUser: User | undefined = await UserService.updateUserById(
        userFound,
        updateUserDto
      );

      if (!updatedUser) {
        throw new ConflictException("There was a problem updating the user");
      }

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

      const deletedUser: User | undefined = await UserService.deleteUserById(
        userFound
      );

      if (!deletedUser) {
        throw new ConflictException("There was a problem deleting the user");
      }

      res.json({
        status: true,
        data: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
