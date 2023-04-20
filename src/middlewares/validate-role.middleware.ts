import { NextFunction, Response } from "express";

import { Roles, User } from "../entities";
import { RequestWithUser } from "../interfaces";
import { ForbiddenException, UnauthorizedException } from "../exceptions";

export const hasPermission = (validRoles: Roles[] = []) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userFound: User | undefined = req.user;

      if (!validRoles || validRoles.length === 0) {
        return next();
      }

      if (!userFound) {
        throw new UnauthorizedException("Authentication required");
      }

      for (const role of userFound.roles) {
        if (!validRoles.includes(role)) {
          throw new ForbiddenException(
            `The user ${userFound.username} needs the ${
              validRoles.length > 1
                ? `roles of [${validRoles}]`
                : `${validRoles} role`
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
