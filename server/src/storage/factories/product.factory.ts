import { Injectable, Logger } from '@nestjs/common';

import { ValidationError } from '@shop-domain/errors/errors';
import { ProductOrmEntity } from '@shop-storage/orm/product.orm.entity';
import { Product } from '@shop-domain/entities/product.entity';

@Injectable()
export class ProductFactory {
  private logger = new Logger(ProductFactory.name);
  buildProductFromOrmEntity(data: ProductOrmEntity) {
    return new Product(
      data.productId,
      data.name,
      data.producer,
      data.description,
      data.price,
      data.year,
      data.sale,
      data.genre,
    );
  }

  buildOrmEntityFromProduct(product: Product) {
    try {
      const ormProduct = new ProductOrmEntity();
      if (product.productId !== null) {
        ormProduct.productId = product.productId;
      }
      ormProduct.name = product.name;
      ormProduct.producer = product.producer;
      ormProduct.description = product.description;
      ormProduct.price = product.price;
      ormProduct.year = product.year;
      ormProduct.sale = product.sale;
      ormProduct.genre = product.genre;
      return ormProduct;
    } catch (error) {
      this.logger.warn(`A new product can't be created from the input info.`);
      throw new ValidationError();
    }
  }
}
