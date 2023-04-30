import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserResponseDto } from './interfaces/response-user.dto';
import { CreateUserDto } from 'src/users/interfaces/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() userDto: CreateUserDto): Promise<UserResponseDto> {
    const result = await this.authService.registration(userDto);
    return result;
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req): Promise<UserResponseDto> {
    const result = await this.authService.login(req);
    return result;
  }
}
