import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { BadRequestException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  // Define the InvalidProduct interface just for testing purposes
  interface InvalidProduct {
    name: any;
    description: string;
    tags: any;
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            createProducts: jest.fn().mockReturnValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  describe('createProducts', () => {
    it('should return an array of products', () => {
      const productsArray = [
        { name: 'Product A', description: 'Description A', tags: ['tagA'] },
        { name: 'Product B', description: 'Description B', tags: ['tagB'] },
      ];
      const expectedResponse = { products: [] };

      jest
        .spyOn(service, 'createProducts')
        .mockReturnValue(expectedResponse.products);

      expect(controller.createProducts(productsArray)).toEqual(
        expectedResponse,
      );
      expect(service.createProducts).toHaveBeenCalledWith(productsArray);
    });

    it('should throw BadRequestException if payload is not an array', () => {
      expect(() => controller.createProducts(null)).toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if product structure is invalid', () => {
      const invalidProductArray: InvalidProduct[] = [
        { name: 123, description: 'Invalid', tags: ['tag1'] },
      ];

      expect(() => controller.createProducts(invalidProductArray)).toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if tags are not an array', () => {
      const invalidProductArray: InvalidProduct[] = [
        { name: 'Product C', description: 'Description C', tags: 'tag1' },
      ];

      expect(() => controller.createProducts(invalidProductArray)).toThrow(
        BadRequestException,
      );
    });
  });
});
