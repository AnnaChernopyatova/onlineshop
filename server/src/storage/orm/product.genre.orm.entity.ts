import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GenreOrmEntity {
  @PrimaryGeneratedColumn()
  genreId: number;

  @Column()
  name: string;
}
