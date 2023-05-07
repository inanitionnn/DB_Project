import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseService } from 'src/database/database.service';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './interfaces/create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserQueries } from 'src/queries/userQueries';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let configService: ConfigService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ConfigService,
        {
          provide: DatabaseService,
          useValue: {
            executeQuery: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('getUserById', () => {
    it('should return a user with a valid id', async () => {
      const user: IUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      jest.spyOn(databaseService, 'executeQuery').mockResolvedValueOnce([user]);

      const result = await service.getUserById('1');
      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(databaseService, 'executeQuery').mockResolvedValueOnce([]);

      const result = await service.getUserById('1');
      expect(result).toBeNull();
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user with a valid email', async () => {
      const user: IUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      jest.spyOn(databaseService, 'executeQuery').mockResolvedValueOnce([user]);

      const result = await service.getUserByEmail('test@example.com');
      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(databaseService, 'executeQuery').mockResolvedValueOnce([]);

      const result = await service.getUserByEmail('test@example.com');
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    };

    it('should create a new user and return the user object', async () => {
      const hashedPassword = 'hashedPassword';
      const id = expect.any(String);
      const saltRounds = configService.get('saltRounds');
      const expectedUser = {
        id,
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
      };

      jest.spyOn(service, 'getUserByEmail').mockResolvedValueOnce(null);
      const bcryptMock = jest
        .fn()
        .mockImplementation((text, saltRounds, callback) => {
          callback(null, hashedPassword);
        });
      jest.spyOn(bcrypt, 'hash').mockImplementation(bcryptMock);
      jest
        .spyOn(databaseService, 'executeQuery')
        .mockResolvedValueOnce([expectedUser]);

      const result = await service.createUser(createUserDto);

      expect(service.getUserByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(databaseService.executeQuery).toHaveBeenCalledWith(
        UserQueries.CREATE_NEW_USER,
        [id, createUserDto.email, createUserDto.name, hashedPassword],
      );
      expect(bcryptMock).toHaveBeenCalledWith(
        createUserDto.password,
        saltRounds,
        expect.any(Function),
      );
      expect(result).toEqual(expectedUser);
    });

    it('should throw a 400 HttpException if the email is already in use', async () => {
      const existingUser: IUser = {
        id: expect.any(String),
        email: createUserDto.email,
        name: 'Existing User',
        password: 'hashedpassword',
      };

      const bcryptMock = jest
        .fn()
        .mockImplementation((text, saltRounds, callback) => {
          callback(null, 'hashedpassword');
        });
      jest.spyOn(service, 'getUserByEmail').mockResolvedValueOnce(existingUser);

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        new HttpException(
          'This Email is already in use',
          HttpStatus.BAD_REQUEST,
        ),
      );

      expect(service.getUserByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(bcryptMock).not.toHaveBeenCalled();
      expect(databaseService.executeQuery).not.toHaveBeenCalled();
    });

    it('should throw a 500 HttpException if an error occurs during user creation', async () => {
      const saltRounds = configService.get('saltRounds');
      jest.spyOn(service, 'getUserByEmail').mockResolvedValueOnce(null);
      const bcryptMock = jest
        .fn()
        .mockImplementation((text, saltRounds, callback) => {
          callback(null, 'hashedPassword');
        });
      jest.spyOn(bcrypt, 'hash').mockImplementation(bcryptMock);
      jest
        .spyOn(databaseService, 'executeQuery')
        .mockRejectedValueOnce(new Error());

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        new HttpException(
          'Creating user error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );

      expect(service.getUserByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(bcryptMock).toHaveBeenCalledWith(
        createUserDto.password,
        saltRounds,
        expect.any(Function),
      );
      expect(databaseService.executeQuery).toHaveBeenCalledWith(
        UserQueries.CREATE_NEW_USER,
        expect.any(Array),
      );
    });
  });
});
