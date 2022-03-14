import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UpdateProductDTO } from './dto/update-product.dto';
import { CreateProductDTO } from './dto/create-product.dto';

import { ProductService } from '@shop-domain/services/product.service';
import { Product } from '@shop-domain/entities/product.entity';

@ApiTags('products')
@Controller('rest/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'All products successfully got.', type: [Product] })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findAll(): Promise<Product[]> {
    try {
      return this.productService.getAll();
    } catch (error) {
      throw new Error(String(error));
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The product successfully got by id.', type: Product })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    try {
      return this.productService.getOne(id);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  @Get('/genre/:genreId')
  @ApiResponse({ status: 200, description: 'Products were successfully got by category.', type: [Product] })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findAllByGenre(@Param('genreId', ParseIntPipe) genreId: number) {
    try {
      return this.productService.getAllByGenre(genreId);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  @Post()
  @ApiBody({ type: CreateProductDTO })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.', type: Product })
  @ApiResponse({ status: 400, description: `The product can't be created` })
  async create(@Body() product: CreateProductDTO): Promise<Product> {
    try {
      return this.productService.create(product);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.', type: Product })
  @ApiResponse({ status: 400, description: `The product can't be updated` })
  @ApiBody({ type: UpdateProductDTO })
  async update(@Param('id', ParseIntPipe) id: number, @Body() product: UpdateProductDTO): Promise<Product> {
    try {
      return this.productService.update(id, product);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      return this.productService.delete(id);
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
