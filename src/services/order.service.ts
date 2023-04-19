import { FindOptionsWhere, Like, Repository } from "typeorm";

import { AppDataSource } from "../config";
import { CreateOrderDto, GetOrdersQueryDto } from "../dtos";
import { Combo, Order, OrderDetail, Product, User } from "../entities";

class OrderService {
  private readonly comboRepository: Repository<Combo>;
  private readonly orderRepository: Repository<Order>;
  private readonly orderDetailRepository: Repository<OrderDetail>;
  private readonly productRepository: Repository<Product>;
  private readonly userRepository: Repository<User>;

  constructor() {
    this.comboRepository = AppDataSource.getRepository(Combo);
    this.orderRepository = AppDataSource.getRepository(Order);
    this.orderDetailRepository = AppDataSource.getRepository(OrderDetail);
    this.productRepository = AppDataSource.getRepository(Product);
    this.userRepository = AppDataSource.getRepository(User);
  }

  createOrder(CreateOrderDto: CreateOrderDto): Promise<Order> {
    const { paymentMethod, orderStatus, userId, subtotal, total, details } =
      CreateOrderDto;

    const newOrder: Order = this.orderRepository.create({
      paymentMethod,
      orderStatus,
      user: this.userRepository.create({
        id: userId,
      }),
      subtotal,
      total,
      details: details.map(({ id, isCombo, quantity, price }) => {
        if (isCombo) {
          return this.orderDetailRepository.create({
            combo: this.comboRepository.create({
              id,
            }),
            quantity,
            price,
          });
        }

        return this.orderDetailRepository.create({
          product: this.productRepository.create({
            id,
          }),
          quantity,
          price,
        });
      }),
    });

    return this.orderRepository.save(newOrder);
  }

  getOrders(getOrdersQueryDto: GetOrdersQueryDto): Promise<Order[]> {
    const { user, limit = 10, offset = 0 } = getOrdersQueryDto;

    const findOptionsWhere: FindOptionsWhere<Order> = {};

    if (user) {
      findOptionsWhere.user = {
        username: Like(user.toLowerCase()),
      };
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
}

export default new OrderService();
