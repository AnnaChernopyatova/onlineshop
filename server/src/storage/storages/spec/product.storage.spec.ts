import { Repository } from 'typeorm';

import { ProductStorage } from '@shop-storage/storages/product.storage';
import { ProductFactory } from '@shop-storage/factories/product.factory';
import { ProductOrmEntity } from '@shop-storage/orm/product.orm.entity';
import { Product } from '@shop-domain/entities/product.entity';

describe('ProductService', () => {
  let productRepository: Repository<ProductOrmEntity>;
  let productStorage: ProductStorage;
  const ormEntity = new ProductOrmEntity();
  ormEntity.productId = 5;
  ormEntity.name = 'The Witcher';
  ormEntity.producer = 'CD Project Red';
  ormEntity.description = '';
  ormEntity.price = 500;
  ormEntity.year = 2007;
  ormEntity.sale = false;

  beforeEach(() => {
    productRepository = {
      async findOne(): Promise<unknown> {
        return null as unknown;
      },
      async find(): Promise<unknown> {
        return null as unknown;
      },
      async save(): Promise<unknown> {
        return null as unknown;
      },
      async update(): Promise<unknown> {
        return null as unknown;
      },
      async delete(): Promise<unknown> {
        return null as unknown;
      },
    } as unknown as Repository<ProductOrmEntity>;
    productStorage = new ProductStorage(productRepository, new ProductFactory());
  });

  describe('findOne', () => {
    it('should be called properly', async () => {
      const spyRep = jest.spyOn(productRepository, 'findOne');
      spyRep.mockResolvedValue(ormEntity);

      const result = await productStorage.findOne(5);

      expect(spyRep).toHaveBeenCalledTimes(1);
      expect(spyRep).toHaveBeenCalledWith(5, { relations: ['genre'] });

      expect(result.productId).toEqual(5);
      expect(result.name).toEqual('The Witcher');
      expect(result.producer).toEqual('CD Project Red');
      expect(result.description).toEqual('');
      expect(result.price).toEqual(500);
      expect(result.year).toEqual(2007);
      expect(result.sale).toEqual(false);
    });
  });

  describe('findAll', () => {
    it('should be called properly', async () => {
      const spy = jest.spyOn(productRepository, 'find');
      spy.mockResolvedValue([ormEntity]);

      const result = await productStorage.findAll();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ relations: ['genre'] });
      expect(Array.isArray(result)).toBeTruthy();
      expect(result[0]).toBeInstanceOf(Product);
    });
  });

  describe('create', () => {
    it('should be called properly', async () => {
      const product = new Product(5, 'The Witcher', 'CD Project Red', '', 500, 2007, false, {
        genreId: 1,
        name: 'RPG',
      });
      const spySave = jest.spyOn(productRepository, 'save');
      const spyFindOne = jest.spyOn(productRepository, 'findOne');
      spyFindOne.mockResolvedValue(ormEntity);
      spySave.mockResolvedValue(ormEntity);

      const result = await productStorage.create(product);

      expect(spySave).toHaveBeenCalledTimes(1);
      expect(spySave).toHaveBeenCalledWith(product);
      expect(result).toBeInstanceOf(Product);
    });
  });

  describe('update', () => {
    it('should be called properly', async () => {
      const spyUpdate = jest.spyOn(productRepository, 'update');
      const spyFindOne = jest.spyOn(productRepository, 'findOne');
      spyFindOne.mockResolvedValue(ormEntity);
      const result = await productStorage.update(
        5,
        new Product(5, 'The Witcher', 'CD Project', '', 500, 2007, false, { genreId: 1, name: 'RPG' }),
      );

      expect(spyUpdate).toHaveBeenCalledTimes(1);
      expect(spyUpdate).toHaveBeenCalledWith(
        5,
        new Product(5, 'The Witcher', 'CD Project', '', 500, 2007, false, { genreId: 1, name: 'RPG' }),
      );
      ormEntity.producer = 'CD Project';
      expect(spyFindOne).toHaveReturned();
      expect(result.productId).toEqual(5);
    });
  });

  describe('delete', () => {
    it('should be called properly', async () => {
      const spy = jest.spyOn(productRepository, 'delete');

      await productStorage.delete(5);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(5);
    });
  });
});
