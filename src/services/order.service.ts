import { FindOptionsWhere, Like, Repository } from "typeorm";

import { AppDataSource } from "../database";

import {
  CreateOrderDto,
  GetOrdersQueryDto,
  SearchOrdersQueryDto,
  UpdateOrderDto,
} from "../dtos";

import { Address, Order, OrderDetail, Product, User } from "../entities";

class OrderService {
  private readonly addressRepository: Repository<Address>;
  private readonly orderRepository: Repository<Order>;
  private readonly orderDetailRepository: Repository<OrderDetail>;
  private readonly productRepository: Repository<Product>;
  private readonly userRepository: Repository<User>;

  constructor() {
    this.addressRepository = AppDataSource.getRepository(Address);
    this.orderRepository = AppDataSource.getRepository(Order);
    this.orderDetailRepository = AppDataSource.getRepository(OrderDetail);
    this.productRepository = AppDataSource.getRepository(Product);
    this.userRepository = AppDataSource.getRepository(User);
  }

  createOrder(CreateOrderDto: CreateOrderDto): Promise<Order> {
    const {
      deliveryType,
      paymentMethod,
      status,
      userId,
      addressId,
      total,
      details,
    } = CreateOrderDto;

    const newOrder: Order = this.orderRepository.create({
      deliveryType,
      paymentMethod,
      status,
      total,
      user: this.userRepository.create({
        id: userId,
      }),
      address: this.addressRepository.create({
        id: addressId,
      }),
      details: details.map(({ productId, quantity }) =>
        this.orderDetailRepository.create({
          product: this.productRepository.create({
            id: productId,
          }),
          quantity,
        })
      ),
    });

    return this.orderRepository.save(newOrder);
  }

  getOrders(getOrdersQueryDto: GetOrdersQueryDto): Promise<Order[]> {
    const { limit = 10, offset = 0 } = getOrdersQueryDto;

    return this.orderRepository.find({
      take: limit,
      skip: offset,
    });
  }

  searchOrders(searchOrdersQueryDto: SearchOrdersQueryDto): Promise<Order[]> {
    const { user, status, limit = 10, offset = 0 } = searchOrdersQueryDto;

    const findOptionsWhere: FindOptionsWhere<Order> = {};

    if (user) {
      findOptionsWhere.user = {
        username: Like(user.trim().toLowerCase()),
      };
    }

    if (status) {
      findOptionsWhere.status = status;
    }

    return this.orderRepository.find({
      where: findOptionsWhere,
      take: limit,
      skip: offset,
    });
  }

  getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateOrderById(
    order: Order,
    updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    const {
      deliveryStatus,
      deliveryType,
      paymentMethod,
      status,
      total,
      details,
    } = updateOrderDto;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newOrder: Order = this.orderRepository.create({
        id: order.id,
        deliveryStatus: deliveryStatus ? deliveryStatus : order.deliveryStatus,
        deliveryType: deliveryType ? deliveryType : order.deliveryType,
        paymentMethod: paymentMethod ? paymentMethod : order.paymentMethod,
        status: status ? status : order.status,
        total: total ? total : order.total,
      });

      if (details) {
        await this.orderDetailRepository.delete({
          order: {
            id: order.id,
          },
        });

        newOrder.details = details.map(({ productId, quantity }) =>
          this.orderDetailRepository.create({
            product: this.productRepository.create({
              id: productId,
            }),
            quantity,
          })
        );
      }

      const updatedOrder: Order = await this.orderRepository.save(newOrder);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return updatedOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return order;
  }

  deleteOrderById(order: Order): Promise<Order> {
    return this.orderRepository.remove(order);
  }
}

export default new OrderService();
