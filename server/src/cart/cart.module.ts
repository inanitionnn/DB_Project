import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProviders } from './cart.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [DatabaseModule, UsersModule, ProductsModule],
  providers: [CartService, ...cartProviders],
  controllers: [CartController],
})
export class CartModule {}
