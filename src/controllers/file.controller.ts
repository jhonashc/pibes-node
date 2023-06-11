import { existsSync } from "fs-extra";
import { NextFunction, Request, Response } from "express";

import { BadRequestException } from "../exceptions";
import { FileService } from "../services";

export class FileController {
  async getImageByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageName } = req.params;

      const imagePath: string = FileService.getImageByName(imageName);

      if (!existsSync(imagePath)) {
        throw new BadRequestException(
          `La imagen con el nombre ${imageName} no ha sido encontrada`
        );
      }

      res.sendFile(imagePath);
    } catch (error) {
      next(error);
    }
  }
}
