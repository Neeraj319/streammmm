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
  // async generateJwt(user: User): Promise<string> {
  //   return await this.prisma.user.findOne({
  //     where: {
  //       id: user.id,
  //     },
  //   });
  // }
}
