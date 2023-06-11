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

  async deleteImageByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageName } = req.params;

      const imagePath: string = FileService.getImageByName(imageName);

      if (!existsSync(imagePath)) {
        throw new BadRequestException(
          `La imagen con el nombre ${imageName} no ha sido encontrada`
        );
      }

      await FileService.deleteImageByName(imagePath);

      res.json({
        status: true,
        message: "La imagen ha sido eliminada con éxito",
        data: imagePath,
      });
    } catch (error) {
      next(error);
    }
  }
}
