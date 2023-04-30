import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './interfaces/response-user.dto';
import { IUser } from 'src/users/interfaces/user.interface';
import { CreateUserDto } from 'src/users/interfaces/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  public async registration(user: CreateUserDto): Promise<UserResponseDto> {
    const newUser = await this.userService.createUser(user);
    const resUser = new UserResponseDto(newUser);
    return resUser;
  }

  public async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<IUser> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!user.password) {
      throw new HttpException(
        'Not found password.You may have signed up with Google',
        HttpStatus.NOT_FOUND,
      );
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  public async login(req): Promise<UserResponseDto> {
    const resUser = new UserResponseDto(req.user);
    return resUser;
  }
}
