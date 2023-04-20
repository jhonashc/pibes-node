import { NextFunction, Request, Response } from "express";

import { CreateOrderDto, GetOrdersQueryDto, UpdateOrderDto } from "../dtos";
import { Combo, Order, Product, User } from "../entities";
import { NotFoundException } from "../exceptions";
import { mapOrder, mapOrders } from "../helpers";
import { OrderMapped } from "../interfaces";

import {
  ComboService,
  OrderService,
  ProductService,
  UserService,
} from "../services";

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

      const comboIds: string[] = details
        .filter((orderDetail) => orderDetail.isCombo)
        .map(({ id }) => id);

      const productIds: string[] = details
        .filter((orderDetail) => !orderDetail.isCombo)
        .map(({ id }) => id);

      if (comboIds.length) {
        const combosFound: Combo[] = await ComboService.getCombosByIds(
          comboIds
        );

        if (combosFound.length !== comboIds.length) {
          throw new NotFoundException("The id of some combo is invalid");
        }
      }

      if (productIds.length) {
        const productsFound: Product[] = await ProductService.getProductsByIds(
          productIds
        );

        if (productsFound.length !== productIds.length) {
          throw new NotFoundException("The id of some product is invalid");
        }
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
      const { user, status, limit, offset } = req.query as GetOrdersQueryDto;

      const orders: Order[] = await OrderService.getOrders({
        user,
        status,
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

  async updateOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { paymentMethod, orderStatus, subtotal, total, details } =
        req.body as UpdateOrderDto;

      const orderFound: Order | null = await OrderService.getOrderById(id);

      if (!orderFound) {
        throw new NotFoundException(
          `The order with id ${id} has not been found`
        );
      }

      if (details) {
        const comboIds: string[] = details
          .filter((orderDetail) => orderDetail.isCombo)
          .map(({ id }) => id);

        const productIds: string[] = details
          .filter((orderDetail) => !orderDetail.isCombo)
          .map(({ id }) => id);

        if (comboIds.length) {
          const combosFound: Combo[] = await ComboService.getCombosByIds(
            comboIds
          );

          if (combosFound.length !== comboIds.length) {
            throw new NotFoundException("The id of some combo is invalid");
          }
        }

        if (productIds.length) {
          const productsFound: Product[] =
            await ProductService.getProductsByIds(productIds);

          if (productsFound.length !== productIds.length) {
            throw new NotFoundException("The id of some product is invalid");
          }
        }
      }

      const updateOrderDto: UpdateOrderDto = {
        paymentMethod,
        orderStatus,
        subtotal,
        total,
        details,
      };

      const updatedOrder: Order | undefined =
        await OrderService.updateOrderById(orderFound, updateOrderDto);

      res.json({
        status: true,
        data: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const orderFound: Order | null = await OrderService.getOrderById(id);

      if (!orderFound) {
        throw new NotFoundException(
          `The order with id ${id} has not been found`
        );
      }

      const deletedOrder: Order = await OrderService.deleteOrderById(
        orderFound
      );

      res.json({
        status: true,
        data: deletedOrder,
      });
    } catch (error) {
      next(error);
    }
  }
}
