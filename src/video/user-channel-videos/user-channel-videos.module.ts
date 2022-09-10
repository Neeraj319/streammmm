import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ChannelService } from 'src/channel/channel.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VideoModule } from '../video.module';
import { UserChannelVideosController } from './user-channel-videos.controller';
@Module({
  imports: [PrismaModule, AuthModule, forwardRef(() => VideoModule)],
  controllers: [UserChannelVideosController],
  providers: [ChannelService],
})
export class UserChannelVideosModule {}
