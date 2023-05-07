import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.interface';
import * as uuid from 'uuid';
import { UserQueries } from '../queries/userQueries';
import { CreateUserDto } from './interfaces/create-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UsersService {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService,
  ) {}
  public async getUserById(id: string): Promise<IUser | null> {
    const users: IUser[] = await this.databaseService.executeQuery(
      UserQueries.SELECT_USER_BY_ID,
      [id],
    );
    const user = users[0];
    if (!user) {
      return null;
    }
    return user;
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    const users: IUser[] = await this.databaseService.executeQuery(
      UserQueries.SELECT_USER_BY_EMAIL,
      [email],
    );
    const user = users[0];
    if (!user) {
      return null;
    }
    return user;
  }

  private hash(text: string, saltRounds: number): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(text, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  public async createUser(dto: CreateUserDto): Promise<IUser> {
    const user = await this.getUserByEmail(dto.email);
    if (user) {
      throw new HttpException(
        'This Email is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    const id = uuid.v4();
    const saltRounds = this.configService.get('saltRounds');
    const hashedPassword = await this.hash(dto.password, saltRounds);
    try {
      const newUsers: IUser[] = await this.databaseService.executeQuery(
        UserQueries.CREATE_NEW_USER,
        [id, dto.email, dto.name, hashedPassword],
      );
      return newUsers[0];
    } catch (error) {
      throw new HttpException(
        'Creating user error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteAllUser(): Promise<IUser[]> {
    try {
      const users: IUser[] = await this.databaseService.executeQuery(
        UserQueries.SELECT_ALL_USERS,
        [],
      );
      for (const user of users) {
        await this.databaseService.executeQuery(UserQueries.DELETE_USER_BY_ID, [
          user.id,
        ]);
      }
      return users;
    } catch (error) {
      throw new HttpException(
        'Deleting all users error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
