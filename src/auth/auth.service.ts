import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { ErrorHandler } from './utils/errorHandler';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
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
    bcrypt.hash(user.password, 10, (error, hash) => {
      if (error) {
        console.log(error);
      }
      user.password = hash;
    });
    try {
      await this.prisma.user.create({ data: { ...user } });
    } catch (e) {
      new ErrorHandler(e)
        .checkInstance()
        .checkErrorCode('P2002')
        .raiseCustomError('User with that username already exists ');
    }
  }
}
