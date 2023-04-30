import { CartProduct } from './cartProduct.entity';

export const cartProductProviders = [
  { provide: 'CartProductRepository', useValue: CartProduct },
];
