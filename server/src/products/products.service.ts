import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { IProduct } from './interfaces/product.interface';
import { ProductQueries } from 'src/queries/productQueries';

@Injectable()
export class ProductsService {
  constructor(private databaseService: DatabaseService) {}

  public async getProductById(id: string): Promise<IProduct> {
    const products: IProduct[] = await this.databaseService.executeQuery(
      ProductQueries.SELECT_PRODUCT_BY_ID,
      [id],
    );
    const product = products[0];
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  public async getAllProducts(): Promise<IProduct[]> {
    const products: IProduct[] = await this.databaseService.executeQuery(
      ProductQueries.SELECT_ALL_PRODUCTS,
      [],
    );
    return products;
  }
}
