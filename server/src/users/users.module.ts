import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './users.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
