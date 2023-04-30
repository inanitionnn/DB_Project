import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { Body, Delete, Get, Param, Post } from '@nestjs/common/decorators';
import {
  ICartProduct,
  ICartProductRequest,
  ICartProductResponse,
} from './interfaces/cart.interface';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':userId')
  async getCart(
    @Param('userId') userId: string,
  ): Promise<ICartProductResponse> {
    const result = await this.cartService.getCart(userId);
    return result;
  }

  @Delete(':userId')
  async deleteProducts(
    @Param('userId') userId: string,
  ): Promise<ICartProduct[]> {
    const result = await this.cartService.deleteProducts(userId);
    return result;
  }

  @Post('add')
  async addProduct(
    @Body() dto: ICartProductRequest,
  ): Promise<ICartProductResponse> {
    const result = await this.cartService.addProduct(dto);
    return result;
  }

  @Post('subtract')
  async subtractProduct(
    @Body() dto: ICartProductRequest,
  ): Promise<ICartProductResponse> {
    const result = await this.cartService.subtractProduct(dto);
    return result;
  }
}
