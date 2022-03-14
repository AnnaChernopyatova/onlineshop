import { Genre } from '@shop-domain/entities/genre.entity';

export class Product {
  constructor(
    readonly productId: number | null,
    readonly name: string,
    readonly producer: string,
    readonly description: string,
    readonly price: number,
    readonly year: number,
    readonly sale: boolean,
    readonly genre: Genre,
  ) {}
}
