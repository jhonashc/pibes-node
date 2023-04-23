import { Router } from "express";

import { OrderController } from "../controllers";

import {
  CreateOrderDto,
  GetOrdersQueryDto,
  IdParamDto,
  UpdateOrderDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { validateRequest } from "../middlewares";

const router = Router();

const orderController = new OrderController();

router.post("/", validateRequest(CreateOrderDto), orderController.createOrder);

router.get(
  "/",
  validateRequest(GetOrdersQueryDto, ValidationType.QUERY),
  orderController.getOrders
);

router.get(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  orderController.getOrderById
);

router.patch(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  validateRequest(UpdateOrderDto),
  orderController.updateOrderById
);

router.delete(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  orderController.deleteOrderById
);

export default router;
