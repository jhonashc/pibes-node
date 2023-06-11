import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

import { BadRequestException } from "../exceptions";

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: Function
) => {
  if (!file) {
    return callback(
      new BadRequestException("El archivo no ha sido encontrado"),
      false
    );
  }

  const fileExtension: string = file.mimetype.split("/")[1];
  const validExtensions: string[] = ["jpg", "jpeg", "png"];

  if (!validExtensions.includes(fileExtension)) {
    return callback(null, false);
  }

  return callback(null, true);
};

export const fileNamer = (
  req: Request,
  file: Express.Multer.File,
  callback: Function
) => {
  if (!file) {
    return callback(
      new BadRequestException("El archivo no ha sido encontrado"),
      false
    );
  }

  const fileExtension: string = file.mimetype.split("/")[1];
  const fileName: string = `${uuidv4()}.${fileExtension}`;

  callback(null, fileName);
};
