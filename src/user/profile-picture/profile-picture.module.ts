import { Module } from '@nestjs/common';
import { ProfilePictureService } from './profile-picture.service';
import { ProfilePictureController } from './profile-picture.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ProfilePictureController],
  providers: [ProfilePictureService],
})
export class ProfilePictureModule {}
