import { Router } from "express";

import { OrderController } from "../controllers";
import { CreateOrderDto, GetOrdersQueryDto, UuidParamDto } from "../dtos";
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
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  orderController.getOrderById
);

router.delete(
  "/:id",
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  orderController.deleteOrderById
);

export default router;
