import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { GenreOrmEntity } from './product.genre.orm.entity';

@Entity()
export class ProductOrmEntity {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  name: string;

  @Column()
  producer: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  year: number;

  @Column()
  sale: boolean;

  @ManyToOne(() => GenreOrmEntity, genre => genre.genreId)
  genre: GenreOrmEntity;
}
