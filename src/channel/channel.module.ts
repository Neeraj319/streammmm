import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { JwtStrategy } from 'src/auth/stratigies/jwt.strategy';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, PrismaService, JwtStrategy, UserService],
})
export class ChannelModule {}
