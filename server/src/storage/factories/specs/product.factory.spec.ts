import { ProductFactory } from '@shop-storage/factories/product.factory';
import { Product } from '@shop-domain/entities/product.entity';
import { ProductOrmEntity } from '@shop-storage/orm/product.orm.entity';

describe('product factory', () => {
  describe('build product from Orm entity', () => {
    it('should be called properly', () => {
      const productFactory = new ProductFactory();

      const ormEntity = new ProductOrmEntity();
      ormEntity.productId = 5;
      ormEntity.name = 'The Witcher';
      ormEntity.producer = 'CD Project Red';
      ormEntity.description = '';
      ormEntity.price = 500;
      ormEntity.year = 2007;
      ormEntity.sale = false;
      ormEntity.genre = { genreId: 1, name: 'RPG' };

      const result = productFactory.buildProductFromOrmEntity(ormEntity);

      expect(result).toEqual(
        new Product(5, 'The Witcher', 'CD Project Red', '', 500, 2007, false, { genreId: 1, name: 'RPG' }),
      );
    });
  });

  describe('build Orm entity from Orm product', () => {
    it('should be called properly', () => {
      const productFactory = new ProductFactory();
      const ormEntity = new ProductOrmEntity();
      ormEntity.productId = 5;
      ormEntity.name = 'The Witcher';
      ormEntity.producer = 'CD Project Red';
      ormEntity.description = '';
      ormEntity.price = 500;
      ormEntity.year = 2007;
      ormEntity.sale = false;
      ormEntity.genre = { genreId: 1, name: 'RPG' };

      const result = productFactory.buildOrmEntityFromProduct(
        new Product(5, 'The Witcher', 'CD Project Red', '', 500, 2007, false, { genreId: 1, name: 'RPG' }),
      );

      expect(result).toEqual(ormEntity);
    });
  });
});
