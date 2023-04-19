import { NextFunction, Request, Response } from "express";

import { CreateOrderDto, GetOrdersQueryDto } from "../dtos";
import { Order, User } from "../entities";
import { NotFoundException } from "../exceptions";
import { mapOrder, mapOrders } from "../helpers";
import { OrderMapped } from "../interfaces";
import { OrderService, UserService } from "../services";

export class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { paymentMethod, orderStatus, userId, subtotal, total, details } =
        req.body as CreateOrderDto;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const createOrderDto: CreateOrderDto = {
        paymentMethod,
        orderStatus,
        userId,
        subtotal,
        total,
        details,
      };

      const createdOrder: Order = await OrderService.createOrder(
        createOrderDto
      );

      res.status(201).json({
        status: true,
        data: createdOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, limit, offset } = req.query as GetOrdersQueryDto;

      const orders: Order[] = await OrderService.getOrders({
        user,
        limit,
        offset,
      });

      const mappedOrders: OrderMapped[] = mapOrders(orders);

      res.json({
        status: true,
        data: mappedOrders,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const orderFound: Order | null = await OrderService.getOrderById(id);

      if (!orderFound) {
        throw new NotFoundException(
          `The order with id ${id} has not been found`
        );
      }

      const mappedOrder: OrderMapped = mapOrder(orderFound);

      res.json({
        status: true,
        data: mappedOrder,
      });
    } catch (error) {
      next(error);
    }
  }
}