import { IProduct } from 'src/products/interfaces/product.interface';

export interface ICartProductRequest {
  userId: string;
  productId: string;
}
export interface ICartProductResponse {
  total: number;
  products: ICartProduct[];
}
export interface ICart {
  id: string;
  userId: string;
}

export interface ICartProduct extends IProduct {
  count: number;
}
