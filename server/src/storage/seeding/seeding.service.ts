import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { GenreOrmEntity } from '@shop-storage/orm/product.genre.orm.entity';

@Injectable()
export class SeedingService {
  constructor(private readonly entityManager: EntityManager) {}

  async seed(): Promise<void> {
    const genres: GenreOrmEntity[] = [];
    genres.push(this.getGenre(1, 'RPG'));
    genres.push(this.getGenre(2, 'Real-time Strategy'));
    genres.push(this.getGenre(3, 'Battle Royal'));
    genres.push(this.getGenre(4, 'Point and Click Quest'));
    genres.push(this.getGenre(5, 'Racing'));
    await Promise.all([this.entityManager.save(GenreOrmEntity, [...genres])]);
  }

  getGenre(id: number, name: string): GenreOrmEntity {
    const genre = new GenreOrmEntity();
    genre.genreId = id;
    genre.name = name;
    return genre;
  }
}
