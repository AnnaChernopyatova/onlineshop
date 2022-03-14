import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';

import { DomainModule } from '@shop-domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [ProductController],
})
export class RestModule {}
