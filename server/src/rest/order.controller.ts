import { Controller, Get } from '@nestjs/common';

import { OrderService } from '@shop-domain/services/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getHello() {
    return await this.orderService.getOrders();
  }
}
