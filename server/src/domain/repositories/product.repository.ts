import { Product } from '@shop-domain/entities/product.entity';

export interface ProductRepository {
  findOne(id: number): Promise<Product>;

  findAll(): Promise<Product[]>;

  findAllByGenre(id: number): Promise<Product[]>;

  create(product: Product): Promise<Product>;

  update(id: number, updateproduct: Product): Promise<Product>;

  delete(productId: number): Promise<void>;
}

export const ProductRepositorySymbol = Symbol('ProductRepository');
