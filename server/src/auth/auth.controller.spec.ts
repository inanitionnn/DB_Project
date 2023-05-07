import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/interfaces/create-user.dto';
import { IUser } from 'src/users/interfaces/user.interface';
import { UserResponseDto } from './interfaces/response-user.dto';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/database/database.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
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

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('registration', () => {
    it('should register a new user and return the user response', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const user: IUser = {
        id: '1',
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      };

      const expectedResponse: UserResponseDto = new UserResponseDto(user);

      jest
        .spyOn(authService, 'registration')
        .mockResolvedValue(expectedResponse);

      // Act
      const result = await controller.registration(createUserDto);

      // Assert
      expect(authService.registration).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('login', () => {
    it('should log in a user and return the user response', async () => {
      // Arrange
      const request = {
        email: 'john@example.com',
        password: 'password123',
      };

      const user: IUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const expectedResponse: UserResponseDto = new UserResponseDto(user);

      jest.spyOn(authService, 'login').mockResolvedValue(expectedResponse);

      // Act
      const result = await controller.login(request);

      // Assert
      expect(authService.login).toHaveBeenCalledWith(request);
      expect(result).toEqual(expectedResponse);
    });
  });
});
