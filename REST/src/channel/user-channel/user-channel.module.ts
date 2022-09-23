import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VideoModule } from 'src/video/video.module';
import { ChannelService } from '../channel.service';
import { UserChannelController } from './user-channel.controller';
@Module({
  imports: [PrismaModule, AuthModule, forwardRef(() => VideoModule)],
  controllers: [UserChannelController],
  providers: [ChannelService],
})
export class UserChannelModule {}
