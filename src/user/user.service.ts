import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ErrorHandler } from './utils/errorHandler';
import { UserResponseEntity } from './entities/user-response.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
  async getUserById(id: number): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }
  async addUser(user: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    try {
      await this.prisma.user.create({ data: { ...user } });
    } catch (e) {
      new ErrorHandler(e)
        .checkInstance()
        .checkErrorCode('P2002')
        .raiseCustomError('User with that username already exists ');
    }
  }
  async authenticateUser(username: string, password: string): Promise<User> {
    const user: User = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new Error('invalid username or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('invalid username or password');
    }
    return user;
  }

  async updateRefreshToken(userId: number, token: string) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: { refreshToken: token },
    });
  }

  async findAll(): Promise<UserResponseEntity[] | UserResponseEntity> {
    const data = await this.prisma.user.findMany({
      select: {
        username: true,
        id: true,
        refreshToken: true,
        first_name: true,
        last_name: true,
      },
    });
    return data;
  }

  async getUserByIdExcludePassword(id: number): Promise<UserResponseEntity> {
    const data = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        username: true,
        id: true,
        first_name: true,
        last_name: true,
      },
    });
    return data;
  }

  async updateUser(
    userId: number,
    userDto: UpdateUserDto,
  ): Promise<UserResponseEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: userDto.username,
      },
    });
    if (user) {
      throw new Error('Username already exists');
    }
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...userDto,
      },
    });
    return await this.getUserByIdExcludePassword(userId);
  }
}
