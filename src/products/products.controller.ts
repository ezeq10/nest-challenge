import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProducts(
    @Body()
    productArray: { name: string; description: string; tags: string[] }[],
  ): { products: Product[] } {
    if (!Array.isArray(productArray)) {
      throw new BadRequestException('Payload must be an array');
    }

    for (const product of productArray) {
      if (
        typeof product.name !== 'string' ||
        typeof product.description !== 'string' ||
        !Array.isArray(product.tags)
      ) {
        throw new BadRequestException('Invalid product structure');
      }
    }

    const products = this.productsService.createProducts(productArray);
    return { products };
  }

  @Get('similar/:productId')
  getSimilarProducts(@Param('productId') productId: string): {
    recommendations: { productId: string; score: number }[];
  } {
    return this.productsService.getSimilarProducts(productId);
  }
}
