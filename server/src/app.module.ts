import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import configuration from 'src/config/configuration';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client', 'build'),
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    CartModule,
    ProductsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
