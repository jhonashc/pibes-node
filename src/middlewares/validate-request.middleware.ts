import { resolve } from "path";
import { readFileSync } from "fs";
import { NextFunction, Request, Response } from "express";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator-multi-lang";

import { BadRequestException } from "../exceptions";
import { ValidationType } from "../interfaces";

const ES_I18N_MESSAGES = JSON.parse(
  readFileSync(
    resolve("./node_modules/class-validator-multi-lang/i18n/es.json")
  ).toString()
);

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

      const errors = await validate(convertedObject, {
        messages: ES_I18N_MESSAGES,
      });

      if (errors.length > 0) {
        const messages: string = errors
          .map((error: ValidationError) => {
            const { constraints } = error;

            if (constraints) {
              return Object.values(constraints);
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
