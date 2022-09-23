import { Module } from '@nestjs/common';
import { ProfilePictureService } from './profile-picture.service';
import { ProfilePictureController } from './profile-picture.controller';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    PrismaModule,
    RabbitmqModule,
  ],
  controllers: [ProfilePictureController],
  providers: [ProfilePictureService],
})
export class ProfilePictureModule {}
