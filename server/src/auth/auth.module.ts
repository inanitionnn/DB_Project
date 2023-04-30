import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passports/local.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [DatabaseModule, UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
