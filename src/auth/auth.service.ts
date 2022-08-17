import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(id: number): Promise<User> {
    return this.prisma.getUser(id);
  }
}
