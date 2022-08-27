import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import config from './config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UserModule,
    ChannelModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
