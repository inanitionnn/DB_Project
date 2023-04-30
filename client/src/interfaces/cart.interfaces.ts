import { IProduct } from "./product.interfaces";

export interface CartRequest {
  userId: string;
  productId: string;
}

export interface CartResponse {
  total: number;
  products: ICartProduct[];
}

export interface ICartProduct extends IProduct {
  count: number;
}
