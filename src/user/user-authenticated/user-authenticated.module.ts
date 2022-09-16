import { forwardRef, Module } from '@nestjs/common';
import { UserService } from '../user.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserAuthenticatedController } from './user-authenticated.controller';

@Module({
  imports: [PassportModule, forwardRef(() => AuthModule), PrismaModule],
  controllers: [UserAuthenticatedController],
  providers: [UserService],
})
export class UserAuthenticatedModule {}
