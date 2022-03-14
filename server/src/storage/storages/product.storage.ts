import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeletingError, UpdatingError, CreationError, NotFoundError } from '@shop-domain/errors/errors';
import { ProductFactory } from '@shop-storage/factories/product.factory';
import { ProductRepository } from '@shop-domain/repositories/product.repository';
import { ProductOrmEntity } from '@shop-storage/orm/product.orm.entity';
import { Product } from '@shop-domain/entities/product.entity';

@Injectable()
export class ProductStorage implements ProductRepository {
  logger = new Logger();
  constructor(
    @InjectRepository(ProductOrmEntity) private readonly productRepository: Repository<ProductOrmEntity>,
    private readonly productFactory: ProductFactory,
  ) {}

  async findOne(id: number): Promise<Product> {
    const productOrmEntity = await this.productRepository.findOne(id, { relations: ['genre'] });
    if (productOrmEntity !== undefined) {
      return this.productFactory.buildProductFromOrmEntity(productOrmEntity);
    } else {
      throw new NotFoundError('Product');
    }
  }

  async findAll(): Promise<Product[]> {
    const productsOrmEntities = await this.productRepository.find({ relations: ['genre'] });
    if (productsOrmEntities.length !== 0) {
      try {
        return productsOrmEntities.map(product => this.productFactory.buildProductFromOrmEntity(product));
      } catch {
        throw new Error();
      }
    } else {
      this.logger.warn(`There are no such items.`);
      return [];
    }
  }

  async findAllByGenre(id: number): Promise<Product[]> {
    const genresOrmEntities = await this.productRepository.find({ where: { genre: id }, relations: ['genre'] });
    if (genresOrmEntities.length !== 0) {
      try {
        return genresOrmEntities.map(product => this.productFactory.buildProductFromOrmEntity(product));
      } catch {
        throw new Error();
      }
    } else {
      this.logger.warn(`There are no such items.`);
      return [];
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const productOrmEntity = this.productFactory.buildOrmEntityFromProduct(product);
      const result = await this.productRepository.save(productOrmEntity);
      return this.findOne(result.productId);
    } catch {
      throw new CreationError();
    }
  }

  async update(id: number, updateproduct: Product): Promise<Product> {
    try {
      const productOrmEntity = this.productFactory.buildOrmEntityFromProduct(updateproduct);
      await this.productRepository.update(id, productOrmEntity);
      return this.findOne(id);
    } catch {
      throw new UpdatingError();
    }
  }

  async delete(productId: number): Promise<void> {
    try {
      await this.productRepository.delete(productId);
    } catch {
      throw new DeletingError();
    }
  }
}
