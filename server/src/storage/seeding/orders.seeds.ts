import { OrderOrmEntity } from '@shop-storage/orm/order.orm.entity';

export const initialOrders: OrderOrmEntity[] = [
  {
    orderId: 1,
    date: new Date(),
  },
  {
    orderId: 2,
    date: new Date(),
  },
];
