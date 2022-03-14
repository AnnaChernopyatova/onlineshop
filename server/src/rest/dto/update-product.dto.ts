import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  @Matches(RegExp(/[a-zA-Z0-9_-]/))
  readonly name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @Matches(RegExp(/[a-zA-Z0-9_-]/))
  readonly producer?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  readonly description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly price?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1980)
  readonly year?: number;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  readonly sale?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  readonly genreid?: number;

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
