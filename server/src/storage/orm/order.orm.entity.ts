import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderOrmEntity {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  date: Date;
}
