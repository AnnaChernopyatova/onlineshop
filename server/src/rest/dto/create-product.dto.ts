import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'The product should have a title' })
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  @Matches(RegExp(/[a-zA-Z0-9_-]/))
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The product should have a producer' })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @Matches(RegExp(/[a-zA-Z0-9_-]/))
  readonly producer: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The product should have a price' })
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'The product should have a year info' })
  @IsNumber()
  @IsPositive()
  @Min(1980)
  readonly year: number;

  @ApiProperty({ default: false })
  @IsNotEmpty({ message: 'The product should have info about being on sale' })
  @IsBoolean()
  readonly sale: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: `The product should have a genre` })
  @IsNumber()
  @IsPositive()
  @Min(1)
  readonly genreid: number;

  constructor(
    name: string,
    producer: string,
    description: string,
    price: number,
    year: number,
    sale: boolean,
    genreid: number,
  ) {
    this.name = name;
    this.producer = producer;
    this.description = description;
    this.price = price;
    this.year = year;
    this.sale = sale;
    this.genreid = genreid;
  }
}
