import { forwardRef, Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { ChannelModule } from 'src/channel/channel.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [forwardRef(() => ChannelModule), AuthModule, PrismaModule],
  controllers: [VideoController],
  exports: [VideoService],
  providers: [VideoService],
})
export class VideoModule {}
