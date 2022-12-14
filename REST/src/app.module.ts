import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { VideoModule } from './video/video.module';
import config from './config';
import { RouterModule } from '@nestjs/core';
import { UserChannelModule } from './channel/user-channel/user-channel.module';
import { UserChannelVideosModule } from './video/user-channel-videos/user-channel-videos.module';
import { UserAuthenticatedModule } from './user/user-authenticated/user-authenticated.module';
import { ProfilePictureModule } from './user/profile-picture/profile-picture.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UserModule,
    ChannelModule,
    VideoModule,
    UserChannelModule,
    UserChannelVideosModule,
    UserAuthenticatedModule,
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
      {
        path: 'user/',
        module: UserAuthenticatedModule,
        children: [
          {
            path: 'channel/',
            module: UserChannelModule,
            children: [
              {
                path: 'videos/',
                module: UserChannelVideosModule,
              },
            ],
          },
          {
            path: 'profile-picture',
            module: ProfilePictureModule,
          },
        ],
      },
    ]),
    ProfilePictureModule,
    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
