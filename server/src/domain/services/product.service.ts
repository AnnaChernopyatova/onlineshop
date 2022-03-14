import { Inject, Injectable, Logger } from '@nestjs/common';

import { GenreRepositorySymbol, GenreRepository } from '@shop-domain/repositories/genre.repository';
import {
  CreationError,
  UpdatingError,
  DeletingError,
  NotFoundError,
  ValidationError,
} from '@shop-domain/errors/errors';
import { CreateProductDTO } from '@shop-rest/dto/create-product.dto';
import { ProductRepositorySymbol, ProductRepository } from '@shop-domain/repositories/product.repository';
import { Product } from '@shop-domain/entities/product.entity';
import { UpdateProductDTO } from '@shop-rest/dto/update-product.dto';
import { Genre } from '@shop-domain/entities/genre.entity';
import { GenreFactory } from '@shop-storage/factories/genre.factory';
import { ProductFactory } from '@shop-domain/factories/product.factory';

@Injectable()
export class ProductService {
  private logger = new Logger(ProductService.name);
  constructor(
    @Inject(ProductRepositorySymbol)
    private productRepository: ProductRepository,
    private productFactory: ProductFactory,
    @Inject(GenreRepositorySymbol)
    private readonly genreRepository: GenreRepository,
    private readonly genreFactory: GenreFactory,
  ) {}
  async getOne(productId: number): Promise<Product> {
    try {
      this.logger.log(`Search for the product with id: ${productId} has started.`);
      const foundProduct = await this.productRepository.findOne(productId);
      this.logger.log(`Searching completed.`);
      return foundProduct;
    } catch {
      this.logger.error(`The product with such id was not found.`);
      throw new NotFoundError('Product');
    }
  }

  async getAll(): Promise<Product[]> {
    this.logger.log(`Search for all products has started.`);
    const foundProducts: Product[] = await this.productRepository.findAll();
    if (foundProducts.length === 0) {
      this.logger.warn(`There are no such items.`);
      return foundProducts;
    }
    this.logger.log(`Searching completed.`);
    return foundProducts;
  }

  async getAllByGenre(genreId: number): Promise<Product[]> {
    this.logger.log('Search for products by category has started.');
    try {
      const productsByGenre = await this.productRepository.findAllByGenre(genreId);
      if (productsByGenre.length !== 0) {
        this.logger.log('Products by genre were got');
        return productsByGenre;
      } else {
        this.logger.error('Search has failed');
        throw new NotFoundError('Products');
      }
    } catch {
      this.logger.error('Search has failed');
      throw new NotFoundError('Products');
    }
  }

  async create(product: CreateProductDTO): Promise<Product> {
    try {
      this.logger.log(`Creation of a new product has started.`);
      let genre: Genre;
      try {
        genre = await this.genreRepository.findOne(product.genreid);
        if (genre === undefined) {
          throw new ValidationError();
        }
      } catch {
        this.logger.warn(`A new product can't be created from the input info.`);
        throw new ValidationError();
      }
      const newProduct = this.productFactory.buildProductFromCreateDto(product, genre);
      const createdProduct = await this.productRepository.create(newProduct);
      this.logger.log(`Creation completed.`);
      return createdProduct;
    } catch {
      this.logger.error(`The product can't be created.`);
      throw new CreationError();
    }
  }

  async update(productId: number, dto: UpdateProductDTO): Promise<Product> {
    try {
      this.logger.log(`Search for the product with id: ${productId} has started.`);
      const model = await this.productRepository.findOne(productId);
      let genre: Genre;
      try {
        this.logger.log(`Update has started.`);
        try {
          const genreId = dto.genreid ?? model.genre.genreId;
          genre = await this.genreRepository.findOne(genreId);
          if (genre === undefined) {
            throw new ValidationError();
          }
        } catch {
          this.logger.warn(`A new product can't be created from the input info.`);
          throw new ValidationError();
        }
        const updateProduct = this.productFactory.buildProductFromUpdateDto(dto, genre, model);
        const updatedProduct = this.productRepository.update(productId, updateProduct);
        this.logger.log(`Update completed.`);
        return updatedProduct;
      } catch {
        this.logger.error(`The product was not updated.`);
        throw new UpdatingError();
      }
    } catch {
      this.logger.error(`The product with such id was not found.`);
      throw new NotFoundError('Product');
    }
  }

  async delete(productId: number): Promise<void> {
    try {
      this.logger.log(`Delete of the product with id: ${productId} has started.`);
      try {
        await this.productRepository.findOne(productId);
      } catch {
        this.logger.error(`Product with such id doesn't exist.`);
        throw new NotFoundError('Product');
      }
      await this.productRepository.delete(productId);
      this.logger.log(`Delete completed.`);
    } catch {
      this.logger.error(`Delete was not completed.`);
      throw new DeletingError();
    }
  }
}
