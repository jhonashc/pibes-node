import { NextFunction, Response } from "express";

import { User, UserRole } from "../entities";
import { ForbiddenException, UnauthorizedException } from "../exceptions";
import { RequestWithUser } from "../interfaces";

export const hasPermission = (validRoles: UserRole[] = []) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userFound: User | undefined = req.user;

      if (!validRoles || validRoles.length === 0) {
        return next();
      }

      if (!userFound) {
        throw new UnauthorizedException(
          "Necesita estar autenticado para acceder a este módulo"
        );
      }

      for (const role of userFound.roles) {
        if (!validRoles.includes(role)) {
          throw new ForbiddenException(
            `El usuario ${userFound.username} necesita ${
              validRoles.length > 1
                ? `los roles [${validRoles}]`
                : `el rol ${validRoles}`
            }`
          );
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
