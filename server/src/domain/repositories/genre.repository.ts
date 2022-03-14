import { Genre } from '@shop-domain/entities/genre.entity';

export interface GenreRepository {
  findOne(id: number): Promise<Genre>;

  findAll(): Promise<Genre[]>;
}

export const GenreRepositorySymbol = Symbol('GenreRepository');
