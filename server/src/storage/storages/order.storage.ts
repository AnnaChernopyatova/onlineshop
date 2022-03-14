import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderRepository } from '@shop-domain/repositories/order.repository';
import { OrderOrmEntity } from '@shop-storage/orm/order.orm.entity';
import { OrderFactory } from '@shop-storage/factories/order.factory';

@Injectable()
export class OrderStorage implements OrderRepository {
  constructor(
    @InjectRepository(OrderOrmEntity) private readonly orderRepository: Repository<OrderOrmEntity>,
    private readonly orderFactory: OrderFactory,
  ) {}

  async getAllOrders(): Promise<unknown[]> {
    const orderOrmEntities = await this.orderRepository.find();
    return await Promise.all(orderOrmEntities.map(order => this.orderFactory.buildOrderFromOrmData(order)));
  }
}
