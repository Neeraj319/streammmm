import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ErrorHandler } from './utils/errorHandler';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
  async getUserById(id: number): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        id,
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

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
