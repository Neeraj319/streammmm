import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { VideoModule } from './video/video.module';
import config from './config';
import { RouterModule } from '@nestjs/core';
import { VideoService } from './video/video.service';
import { PrismaService } from './prisma/prisma.service';
import { ChannelService } from './channel/channel.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UserModule,
    ChannelModule,
    VideoModule,
    ChannelModule,
    RouterModule.register([
      {
        path: 'channel/',
        module: ChannelModule,
        children: [
          {
            path: ':channelId/videos',
            module: VideoModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [VideoService, PrismaService, ChannelService],
})
export class AppModule {}
