import { Router } from "express";

import { ComboController } from "../controllers";

import {
  CreateComboDto,
  GetCombosQueryDto,
  GetSimilarCombosQueryDto,
  IdParamDto,
  UpdateComboDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { validateRequest } from "../middlewares";

const router = Router();

const comboController = new ComboController();

router.post("/", validateRequest(CreateComboDto), comboController.createCombo);

router.get(
  "/",
  validateRequest(GetCombosQueryDto, ValidationType.QUERY),
  comboController.getCombos
);

router.get(
  "/:id/similar",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  validateRequest(GetSimilarCombosQueryDto, ValidationType.QUERY),
  comboController.getSimilarCombos
);

router.get(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  comboController.getComboById
);

router.patch(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  validateRequest(UpdateComboDto),
  comboController.updateComboById
);

router.delete(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  comboController.deleteComboById
);

export default router;
