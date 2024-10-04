import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should create products and return them', () => {
    const productArray = [
      { name: 'Product A', description: 'Description A', tags: ['tagA'] },
      { name: 'Product B', description: 'Description B', tags: ['tagB'] },
    ];

    const result = service.createProducts(productArray);

    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('id');
    expect(result[0].name).toBe('Product A');
  });
});
