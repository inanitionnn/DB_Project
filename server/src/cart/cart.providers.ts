import { Cart } from './cart.entity';

export const cartProviders = [{ provide: 'CartRepository', useValue: Cart }];
