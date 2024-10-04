import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private idCounter = 0;

  createProducts(
    productArray: { name: string; description: string; tags: string[] }[],
  ): Product[] {
    const newProducts = productArray.map((product) => ({
      id: this.generateId(),
      ...product,
    }));

    this.products.push(...newProducts);
    return this.products;
  }

  private generateId(): string {
    return (++this.idCounter).toString();
  }
}
