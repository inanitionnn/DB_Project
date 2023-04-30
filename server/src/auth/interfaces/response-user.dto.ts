import { IUser } from 'src/users/interfaces/user.interface';

export class UserResponseDto {
  readonly id: string;
  readonly email: string;
  readonly name: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
  }
}
