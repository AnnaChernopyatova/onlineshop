import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { Genre } from '@shop-domain/entities/genre.entity';
import { NotFoundError } from '@shop-domain/errors/errors';
import { GenreRepository } from '@shop-domain/repositories/genre.repository';
import { GenreOrmEntity } from '@shop-storage/orm/product.genre.orm.entity';
import { GenreFactory } from '@shop-storage/factories/genre.factory';

export class GenreStorage implements GenreRepository {
  logger = new Logger();
  constructor(
    @InjectRepository(GenreOrmEntity) private readonly genreRepository: Repository<GenreOrmEntity>,
    private readonly genreFactory: GenreFactory,
  ) {}

  async findOne(id: number): Promise<Genre> {
    const genreOrmEntity = await this.genreRepository.findOne(id);
    if (genreOrmEntity !== undefined) {
      return this.genreFactory.buildGenreFromOrmEntity(genreOrmEntity);
    } else {
      throw new NotFoundError('Genre');
    }
  }

  async findAll(): Promise<Genre[]> {
    const genreOrmEntities = await this.genreRepository.find();
    if (genreOrmEntities.length !== 0) {
      try {
        return genreOrmEntities.map(genre => this.genreFactory.buildGenreFromOrmEntity(genre));
      } catch {
        throw new Error();
      }
    } else {
      this.logger.warn(`There are no such items.`);
      return [];
    }
  }
}
