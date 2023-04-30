import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Get } from '@nestjs/common/decorators';
import { IProduct } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('')
  async getAllProducts(): Promise<IProduct[]> {
    const result = await this.productsService.getAllProducts();
    console.log(result);
    return result;
  }
}
