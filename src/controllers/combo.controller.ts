import { NextFunction, Request, Response } from "express";

import { CreateComboDto, GetCombosQueryDto, UpdateComboDto } from "../dtos";
import { Combo, Product } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { mapCombo, mapCombos } from "../helpers";
import { ComboMapped } from "../interfaces";
import { ComboService, ProductService } from "../services";

export class ComboController {
  async createCombo(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, imageUrl, price, productIds } = req.body as CreateComboDto;

      const lowerCaseName: string = name.trim().toLowerCase();

      const comboFound: Combo | null = await ComboService.getComboByName(
        lowerCaseName
      );

      if (comboFound) {
        throw new ConflictException(
          `The combo with the name ${lowerCaseName} already exists`
        );
      }

      const productsFound: Product[] = await ProductService.getProductsByIds(
        productIds
      );

      if (productsFound.length !== productIds.length) {
        throw new NotFoundException("The id of some product is invalid");
      }

      const createComboDto: CreateComboDto = {
        name: lowerCaseName,
        imageUrl,
        price,
        productIds,
      };

      const createdCombo: Combo = await ComboService.createCombo(
        createComboDto
      );

      res.status(201).json({
        status: true,
        data: createdCombo,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCombos(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, min, max, limit, offset } = req.query as GetCombosQueryDto;

      const combos: Combo[] = await ComboService.getCombos({
        name,
        min,
        max,
        limit,
        offset,
      });

      const mappedCombos: ComboMapped[] = mapCombos(combos);

      res.json({
        status: true,
        data: mappedCombos,
      });
    } catch (error) {
      next(error);
    }
  }

  async getComboById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const comboFound: Combo | null = await ComboService.getComboById(id);

      if (!comboFound) {
        throw new NotFoundException(
          `The combo with id ${id} has not been found`
        );
      }

      const mappedCombo: ComboMapped = mapCombo(comboFound);

      res.json({
        status: true,
        data: mappedCombo,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateComboById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, imageUrl, price, productIds } = req.body as UpdateComboDto;

      const comboFound: Combo | null = await ComboService.getComboById(id);

      if (!comboFound) {
        throw new NotFoundException(
          `The combo with id ${id} has not been found`
        );
      }

      if (productIds?.length) {
        const productsFound: Product[] = await ProductService.getProductsByIds(
          productIds
        );

        if (productsFound.length !== productIds.length) {
          throw new NotFoundException("The id of some product is invalid");
        }
      }

      const updateComboDto: UpdateComboDto = {
        name,
        imageUrl,
        price,
        productIds,
      };

      const updatedCombo: Combo | undefined =
        await ComboService.updateComboById(comboFound, updateComboDto);

      res.json({
        status: true,
        data: updatedCombo,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteComboById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const comboFound: Combo | null = await ComboService.getComboById(id);

      if (!comboFound) {
        throw new NotFoundException(
          `The combo with id ${id} has not been found`
        );
      }

      const deletedCombo: Combo = await ComboService.deleteComboById(
        comboFound
      );

      const mappedCombo: ComboMapped = mapCombo(deletedCombo);

      res.json({
        status: true,
        data: mappedCombo,
      });
    } catch (error) {
      next(error);
    }
  }
}