import { Router } from "express";

import { ComboController } from "../controllers";
import { CreateComboDto, GetCombosQueryDto, UuidParamDto } from "../dtos";
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
  "/:id",
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  comboController.getComboById
);

export default router;
