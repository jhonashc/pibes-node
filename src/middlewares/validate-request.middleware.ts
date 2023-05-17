import i18n from "i18n";
import { NextFunction, Request, Response } from "express";
import { ValidationError, validate } from "class-validator";
import { ClassConstructor, plainToInstance } from "class-transformer";

import { BadRequestException } from "../exceptions";
import { ValidationType } from "../interfaces";

export const validateRequest = <T extends object>(
  classInstance: ClassConstructor<T>,
  validationType: ValidationType = ValidationType.BODY
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const convertedObject = plainToInstance(
        classInstance,
        req[validationType]
      );
      const errors = await validate(convertedObject);

      if (errors.length > 0) {
        const messages: string = errors
          .map((error: ValidationError) => {
            const { constraints, property, value } = error;

            if (constraints) {
              const key: string = Object.keys(constraints)[0];
              return i18n.__(`ValidationMessages.${key}`, property, value);
            }
          })
          .join("|");

        throw new BadRequestException(messages);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
