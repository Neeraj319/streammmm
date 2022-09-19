import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfilePictureService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateProfilePicture(userId: number, fileName: string) {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        profile_picture: fileName,
      },
    });
  }
}
