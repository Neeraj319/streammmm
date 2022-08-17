import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { PrismaService } from '../prisma/prisma.service';
@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
