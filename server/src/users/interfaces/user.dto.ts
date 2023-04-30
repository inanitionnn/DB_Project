import { IUser } from './user.interface';

export class UserDto {
  id: string;
  email: string;
  name: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
  }
}
