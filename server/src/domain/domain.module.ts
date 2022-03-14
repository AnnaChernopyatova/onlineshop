import { Module } from '@nestjs/common';

import { ProductService } from './services/product.service';
import { ProductFactory } from './factories/product.factory';

import { OrderService } from '@shop-domain/services/order.service';
import { OrderFactory } from '@shop-domain/factories/order.factory';
import { StorageModule } from '@shop-storage/storage.module';
import { GenreFactory } from '@shop-storage/factories/genre.factory';

@Module({
  providers: [OrderService, OrderFactory, ProductService, ProductFactory, GenreFactory],
  exports: [OrderService, ProductService],
  imports: [StorageModule],
})
export class DomainModule {}
