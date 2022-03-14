import { Injectable } from '@nestjs/common';

import { OrderEntity } from '@shop-domain/entities/order.entity';
import { OrderOrmEntity } from '@shop-storage/orm/order.orm.entity';

@Injectable()
export class OrderFactory {
  async buildOrderFromOrmData(orderOrmEntity: OrderOrmEntity): Promise<OrderEntity> {
    return new OrderEntity(orderOrmEntity.orderId, orderOrmEntity.date);
  }
}
