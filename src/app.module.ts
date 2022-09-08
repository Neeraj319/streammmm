import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { VideoModule } from './video/video.module';
import config from './config';
import { RouterModule } from '@nestjs/core';

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
  providers: [],
})
export class AppModule {}
