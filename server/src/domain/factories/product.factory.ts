import { Injectable, Logger } from '@nestjs/common';

import { Genre } from '@shop-domain/entities/genre.entity';
import { GenreFactory } from '@shop-storage/factories/genre.factory';
import { ValidationError } from '@shop-domain/errors/errors';
import { Product } from '@shop-domain/entities/product.entity';
import { CreateProductDTO } from '@shop-rest/dto/create-product.dto';
import { UpdateProductDTO } from '@shop-rest/dto/update-product.dto';
import { ProductOrmEntity } from '@shop-storage/orm/product.orm.entity';

@Injectable()
export class ProductFactory {
  private logger: Logger;
  constructor(private readonly genreFactory: GenreFactory) {
    this.logger = new Logger(ProductFactory.name);
  }
  buildProductFromCreateDto(data: CreateProductDTO, genre: Genre) {
    try {
      return new Product(null, data.name, data.producer, data.description, data.price, data.year, data.sale, genre);
    } catch {
      this.logger.warn(`A new product can't be created from the input info.`);
      throw new ValidationError();
    }
  }

  buildCreateDtoFromProduct(product: Product) {
    return new CreateProductDTO(
      product.name,
      product.producer,
      product.description,
      product.price,
      product.year,
      product.sale,
      product.genre.genreId,
    );
  }

  buildProductFromUpdateDto(data: UpdateProductDTO, genre: Genre, updatedProduct: Product) {
    try {
      return new Product(
        updatedProduct.productId,
        data.name ?? updatedProduct.name,
        data.producer ?? updatedProduct.producer,
        data.description ?? updatedProduct.description,
        data.price ?? updatedProduct.price,
        data.year ?? updatedProduct.year,
        data.sale ?? updatedProduct.sale,
        genre ?? updatedProduct.genre,
      );
    } catch {
      this.logger.warn(`The product can't be updated with the input info.`);
      throw new ValidationError();
    }
  }

  buildUpdateDtoFromProduct(product: ProductOrmEntity) {
    return new UpdateProductDTO(
      product.name,
      product.producer,
      product.description,
      product.price,
      product.year,
      product.sale,
      product.genre.genreId,
    );
  }
}
