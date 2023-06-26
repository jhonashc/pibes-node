import { NextFunction, Request, Response } from "express";

import {
  CreateOrderDto,
  GetOrdersQueryDto,
  SearchOrdersQueryDto,
  UpdateOrderDto,
} from "../dtos";

import { Address, Order, Product, User } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { mapOrder, mapOrders } from "../helpers";
import { OrderMapped } from "../interfaces";

import {
  AddressService,
  OrderService,
  ProductService,
  UserAddressService,
  UserService,
} from "../services";

export class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        deliveryType,
        paymentMethod,
        status,
        userId,
        addressId,
        total,
        items,
      } = req.body as CreateOrderDto;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `El usuario con id ${userId} no ha sido encontrado`
        );
      }

      if (addressId) {
        const addressFound: Address | null =
          await AddressService.getAddressById(addressId);

        if (!addressFound) {
          throw new NotFoundException(
            `La dirección con id ${addressId} no ha sido encontrada`
          );
        }

        const userAddressFound: Address | null =
          await UserAddressService.getUserAddress(addressId, userId);

        if (!userAddressFound) {
          throw new NotFoundException(
            `La dirección de usuario con id ${addressId} no ha sido encontrada`
          );
        }
      }

      const productIds: string[] = items.map(({ productId }) => productId);

      if (productIds.length) {
        const productsFound: Product[] = await ProductService.getProductsByIds(
          productIds
        );

        if (productsFound.length !== productIds.length) {
          throw new ConflictException("El id de algún producto no es válido");
        }
      }

      const createOrderDto: CreateOrderDto = {
        deliveryType,
        paymentMethod,
        status,
        userId,
        addressId,
        total,
        items,
      };

      const createdOrder: Order = await OrderService.createOrder(
        createOrderDto
      );

      res.status(201).json({
        status: true,
        message: "La orden ha sido creada con éxito",
        data: createdOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  async searchOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, status, page, limit } = req.query as SearchOrdersQueryDto;

      const orders: Order[] = await OrderService.searchOrders({
        user,
        status,
        page,
        limit,
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

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = req.query as GetOrdersQueryDto;

      const orders: Order[] = await OrderService.getOrders({
        page,
        limit,
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
          `La orden con id ${id} no ha sido encontrada`
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
      const {
        deliveryStatus,
        deliveryType,
        paymentMethod,
        status,
        total,
        items,
      } = req.body as UpdateOrderDto;

      const orderFound: Order | null = await OrderService.getOrderById(id);

      if (!orderFound) {
        throw new NotFoundException(
          `La orden con id ${id} no ha sido encontrada`
        );
      }

      if (items) {
        const productIds: string[] = items
          .map(({ productId }) => productId || "")
          .filter((productId) => productId);

        if (productIds.length) {
          const productsFound: Product[] =
            await ProductService.getProductsByIds(productIds);

          if (productsFound.length !== productIds.length) {
            throw new ConflictException("El id de algún producto no es válido");
          }
        }
      }

      const updateOrderDto: UpdateOrderDto = {
        deliveryStatus,
        deliveryType,
        paymentMethod,
        status,
        total,
        items,
      };

      const updatedOrder: Order = await OrderService.updateOrderById(
        orderFound,
        updateOrderDto
      );

      res.json({
        status: true,
        message: "La orden ha sido actualizada con éxito",
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
          `La orden con id ${id} no ha sido encontrada`
        );
      }

      const deletedOrder: Order = await OrderService.deleteOrderById(
        orderFound
      );

      res.json({
        status: true,
        message: "La orden ha sido eliminada con éxito",
        data: deletedOrder,
      });
    } catch (error) {
      next(error);
    }
  }
}
