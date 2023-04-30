import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  ICart,
  ICartProduct,
  ICartProductRequest,
  ICartProductResponse,
} from './interfaces/cart.interface';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { CartQueries } from 'queries/cartQueries';
import * as uuid from 'uuid';
import { IProduct } from 'src/products/interfaces/product.interface';

@Injectable()
export class CartService {
  constructor(
    private databaseService: DatabaseService,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}
  private async check(
    dto: ICartProductRequest,
  ): Promise<{ cartId: string; productId: string }> {
    const user: IUser = await this.usersService.getUserById(dto.userId);

    const product: IProduct = await this.productsService.getProductById(
      dto.productId,
    );

    const carts: ICart[] = await this.databaseService.executeQuery(
      CartQueries.SELECT_CART_BY_USER_ID,
      [user.id],
    );
    let cart = carts[0];

    try {
      if (carts.length === 0) {
        const id = uuid.v4();
        const newCarts = await this.databaseService.executeQuery(
          CartQueries.CREATE_NEW_CART,
          [id, user.id],
        );
        cart = newCarts[0];
      }
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Creating cart error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { cartId: cart.id, productId: product.id };
  }

  private async getResponse(cartId) {
    const AllCartProducts: ICartProduct[] =
      await this.databaseService.executeQuery(
        CartQueries.SELECT_ALL_CARTPRODUCTS_WITH_COUNT,
        [cartId],
      );
    const PriceSum = await this.databaseService.executeQuery(
      CartQueries.PRISE_SUM_CARTPRODUCTS,
      [cartId],
    );
    const total = PriceSum[0].total;
    return { total, products: AllCartProducts };
  }

  public async deleteProducts(userId): Promise<ICartProduct[]> {
    const user: IUser = await this.usersService.getUserById(userId);

    const carts: ICart[] = await this.databaseService.executeQuery(
      CartQueries.SELECT_CART_BY_USER_ID,
      [user.id],
    );
    let cart = carts[0];

    if (carts.length === 0) {
      const id = uuid.v4();
      const newCarts = await this.databaseService.executeQuery(
        CartQueries.CREATE_NEW_CART,
        [id, user.id],
      );
      cart = newCarts[0];
    }

    try {
      const products = await this.databaseService.executeQuery(
        CartQueries.DELETE_ALL_CARTPRODUCT,
        [cart.id],
      );
      return products;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Deleting products error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getCart(userId) {
    try {
      const user: IUser = await this.usersService.getUserById(userId);

      const carts: ICart[] = await this.databaseService.executeQuery(
        CartQueries.SELECT_CART_BY_USER_ID,
        [user.id],
      );
      let cart = carts[0];

      if (carts.length === 0) {
        const id = uuid.v4();
        const newCarts = await this.databaseService.executeQuery(
          CartQueries.CREATE_NEW_CART,
          [id, user.id],
        );
        cart = newCarts[0];
      }
      return await this.getResponse(cart.id);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Creating cart error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async addProduct(
    dto: ICartProductRequest,
  ): Promise<ICartProductResponse> {
    const { cartId, productId } = await this.check(dto);

    try {
      const CartProducts: ICartProduct[] =
        await this.databaseService.executeQuery(
          CartQueries.SELECT_CARTPRODUCT,
          [cartId, productId],
        );
      if (CartProducts[0]) {
        await this.databaseService.executeQuery(
          CartQueries.ADD_CARTPRODUCT_COUNT,
          [cartId, productId],
        );
      } else {
        await this.databaseService.executeQuery(
          CartQueries.CREATE_NEW_CARTPRODUCT,
          [cartId, productId],
        );
      }
      return await this.getResponse(cartId);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Adding product error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async subtractProduct(
    dto: ICartProductRequest,
  ): Promise<ICartProductResponse> {
    const { cartId, productId } = await this.check(dto);

    try {
      const CartProducts: ICartProduct[] =
        await this.databaseService.executeQuery(
          CartQueries.SELECT_CARTPRODUCT,
          [cartId, productId],
        );
      if (!CartProducts[0]) {
        throw new HttpException(
          'No product in the cart',
          HttpStatus.BAD_REQUEST,
        );
      }
      const CartProduct = CartProducts[0];
      if (CartProduct.count === 1) {
        await this.databaseService.executeQuery(
          CartQueries.DELETE_CARTPRODUCT,
          [cartId, productId],
        );
      } else {
        await this.databaseService.executeQuery(
          CartQueries.SUBTRACT_CARTPRODUCT_COUNT,
          [cartId, productId],
        );
      }
      return await this.getResponse(cartId);
    } catch (err) {
      throw new HttpException(
        'Subtracting product error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
