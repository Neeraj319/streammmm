import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RabbitMqService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class ProfilePictureService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rabbitMQService: RabbitMqService,
  ) {}

  async updateProfilePicture(userId: number, fileName: string) {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        profile_picture: fileName,
      },
    });
    await this.rabbitMQService.addImagetoQueue(fileName);
  }
}
