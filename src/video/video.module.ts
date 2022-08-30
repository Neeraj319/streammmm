import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { JwtStrategy } from 'src/auth/stratigies/jwt.strategy';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChannelService } from 'src/channel/channel.service';
import { VideoController } from './video.controller';

@Module({
  controllers: [VideoController, VideoController],
  providers: [
    VideoService,
    PrismaService,
    JwtStrategy,
    UserService,
    ChannelService,
  ],
})
export class VideoModule {}
