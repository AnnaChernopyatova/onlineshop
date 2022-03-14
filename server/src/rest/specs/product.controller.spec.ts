import { GenreRepository } from '@shop-domain/repositories/genre.repository';
import { ProductController } from '@shop-rest/product.controller';
import { CreateProductDTO } from '@shop-rest/dto/create-product.dto';
import { UpdateProductDTO } from '@shop-rest/dto/update-product.dto';
import { ProductRepository } from '@shop-domain/repositories/product.repository';
import { ProductService } from '@shop-domain/services/product.service';
import { Product } from '@shop-domain/entities/product.entity';
import { ProductFactory } from '@shop-domain/factories/product.factory';
import { GenreFactory } from '@shop-storage/factories/genre.factory';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;
  let productRepository: ProductRepository;
  let genreRepository: GenreRepository;
  const genreFactory = new GenreFactory();
  const productFactory = new ProductFactory(genreFactory);

  beforeEach(() => {
    productRepository = {
      async findOne(): Promise<unknown> {
        return null as unknown;
      },
      async findAll(): Promise<unknown> {
        return null as unknown;
      },
      async findAllByGenre(): Promise<unknown> {
        return null as unknown;
      },
      async create(): Promise<unknown> {
        return null as unknown;
      },
      async update(): Promise<unknown> {
        return null as unknown;
      },
      async delete(): Promise<unknown> {
        return null as unknown;
      },
    } as ProductRepository;
    genreRepository = {
      async findOne(): Promise<unknown> {
        return { genreId: 1, name: 'RPG' };
      },
      async findAll(): Promise<unknown> {
        return null as unknown;
      },
    } as GenreRepository;
    productService = new ProductService(productRepository, productFactory, genreRepository, genreFactory);
    productController = new ProductController(productService);
  });

  describe('findOne', () => {
    it('should be called properly', async () => {
      const spy = jest.spyOn(productService, 'getOne');
      spy.mockResolvedValue(
        new Product(5, 'The Witcher', 'CD Project Red', '', 500, 2007, false, { genreId: 1, name: 'RPG' }),
      );

      const result = await productController.findOne(5);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(5);

      expect(result.productId).toEqual(5);
      expect(result.name).toEqual('The Witcher');
      expect(result.price).toEqual(500);
    });
  });

  describe('findAll', () => {
    it('should be called properly', async () => {
      const spy = jest.spyOn(productService, 'getAll');
      spy.mockResolvedValue([
        new Product(5, 'The Witcher', 'CD Project Red', '', 500, 2007, false, { genreId: 1, name: 'RPG' }),
      ]);

      const result = await productController.findAll();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result[0]).toBeInstanceOf(Product);
    });
  });

  describe('create', () => {
    it('should be called properly', async () => {
      const product = new CreateProductDTO('The Witcher', 'CD Project Red', '', 500, 2007, false, 1);
      const spy = jest.spyOn(productService, 'create');

      await productController.create(product);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(
        new CreateProductDTO(
          product.name,
          product.producer,
          product.description,
          product.price,
          product.year,
          product.sale,
          product.genreid,
        ),
      );
    });
  });

  describe('update', () => {
    it('should be called properly', async () => {
      const spy = jest.spyOn(productService, 'update');
      spy.mockResolvedValue(
        new Product(5, 'The Witcher', 'CD Project', '', 500, 2007, false, { genreId: 1, name: 'RPG' }),
      );

      const result = await productController.update(
        5,
        new UpdateProductDTO('The Witcher', 'CD Project', '', 500, 2007, false, 1),
      );

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(5, new UpdateProductDTO('The Witcher', 'CD Project', '', 500, 2007, false, 1));
      expect(result.productId).toEqual(5);
      expect(result.producer).toEqual('CD Project');
    });
  });

  describe('delete', () => {
    it('should be called properly', async () => {
      const spy = jest.spyOn(productService, 'delete');
      spy.mockResolvedValue();

      await productService.delete(5);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(5);
    });
  });
});
