import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductFactory } from './factories/product.factory';
import { ProductStorage } from './storages/product.storage';
import { ProductOrmEntity } from './orm/product.orm.entity';
import { GenreOrmEntity } from './orm/product.genre.orm.entity';
import { GenreStorage } from './storages/genre.storage';

import { GenreRepositorySymbol } from '@shop-domain/repositories/genre.repository';
import { GenreFactory } from '@shop-storage/factories/genre.factory';
import { ProductRepositorySymbol } from '@shop-domain/repositories/product.repository';
import { OrderStorage } from '@shop-storage/storages/order.storage';
import { OrderOrmEntity } from '@shop-storage/orm/order.orm.entity';
import { OrderFactory } from '@shop-storage/factories/order.factory';
import { OrderRepositorySymbol } from '@shop-domain/repositories/order.repository';

@Module({
  providers: [
    OrderFactory,
    {
      provide: OrderRepositorySymbol,
      useClass: OrderStorage,
    },
    ProductFactory,
    {
      provide: ProductRepositorySymbol,
      useClass: ProductStorage,
    },
    GenreFactory,
    {
      provide: GenreRepositorySymbol,
      useClass: GenreStorage,
    },
  ],
  exports: [OrderRepositorySymbol, ProductRepositorySymbol, GenreRepositorySymbol],
  imports: [TypeOrmModule.forFeature([OrderOrmEntity, ProductOrmEntity, GenreOrmEntity])],
})
export class StorageModule {}
