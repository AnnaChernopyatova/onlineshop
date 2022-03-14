import { Inject, Injectable } from '@nestjs/common';

import { OrderRepository, OrderRepositorySymbol } from '@shop-domain/repositories/order.repository';

@Injectable()
export class OrderService {
  constructor(@Inject(OrderRepositorySymbol) private readonly orderRepository: OrderRepository) {}

  async getOrders(): Promise<unknown[]> {
    return this.orderRepository.getAllOrders();
  }
}
