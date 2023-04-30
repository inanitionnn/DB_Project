import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProductsService, ...productsProviders],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
