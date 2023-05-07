import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Cart } from 'src/cart/cart.entity';
import { CartProduct } from 'src/cart/cartProduct/cartProduct.entity';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import { DatabaseService } from './database.service';
import { ProductQueries } from 'src/queries/productQueries';
import { IProduct } from 'src/products/interfaces/product.interface';
import * as uuid from 'uuid';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService, DatabaseService],
    useFactory: async (
      configService: ConfigService,
      databaseService: DatabaseService,
    ) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        logging: false,
      });
      sequelize.addModels([User, Cart, Product, CartProduct]);
      await sequelize.sync();

      const defaultProducts = [
        { name: 'Sneaker Blue', price: 10.99, photo: 'sneaker-blue.png' },
        { name: 'Sneaker Green', price: 11.99, photo: 'sneaker-green.png' },
        { name: 'Sneaker Orange', price: 12.99, photo: 'sneaker-orange.png' },
        { name: 'Sneaker Pink', price: 13.99, photo: 'sneaker-pink.png' },
        { name: 'Sneaker Purple', price: 14.99, photo: 'sneaker-purple.png' },
        { name: 'Sneaker Yellow', price: 15.99, photo: 'sneaker-yellow.png' },
      ];
      const existingProducts: IProduct[] = await databaseService.executeQuery(
        ProductQueries.SELECT_ALL_PRODUCTS,
        [],
      );
      if (existingProducts.length === 0) {
        for (const product of defaultProducts) {
          const id = uuid.v4();
          await databaseService.executeQuery(
            ProductQueries.CREATE_NEW_PRODUCT,
            [id, product.name, product.price, product.photo],
          );
        }
      }
      return sequelize;
    },
  },
];
