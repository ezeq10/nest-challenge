import { BadRequestException, Injectable } from '@nestjs/common';
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

  getSimilarProducts(productId: string): {
    recommendations: { productId: string; score: number }[];
  } {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    // Similarity logic based on matching tags
    const recommendations = this.products
      .filter((p) => p.id !== productId) // Exclude the original product
      .map((p) => ({
        productId: p.id,
        score: this.calculateSimilarityScoreBasedOnTags(product, p),
      }))
      .sort((a, b) => b.score - a.score); // Sort by score descending

    return { recommendations };
  }

  private calculateSimilarityScoreBasedOnTags(
    product1: Product,
    product2: Product,
  ): number {
    const commonTags = product1.tags.filter((tag) =>
      product2.tags.includes(tag),
    );
    return commonTags.length; // Simple score based on the number of common tags
  }

  // Simple id generator
  private generateId(): string {
    return (++this.idCounter).toString();
  }
}
