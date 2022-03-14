import { GenreOrmEntity } from '@shop-storage/orm/product.genre.orm.entity';
import { Genre } from '@shop-domain/entities/genre.entity';

export class GenreFactory {
  buildGenreFromOrmEntity(data: GenreOrmEntity) {
    return new Genre(data.genreId, data.name);
  }
}
