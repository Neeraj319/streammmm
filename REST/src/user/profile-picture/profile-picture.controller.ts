import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User as UserDecorator } from '../decoratos/request-user.decorator';
import { ProfilePictureService } from './profile-picture.service';
import { imageFileFilter, storage } from './utils/image-store.utils';

@Controller('')
@ApiTags('User Profile Picture')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  @Get(':imageName')
  async getProfilePicture(
    @Param() imageName: { imageName: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const file = createReadStream(
      join(process.cwd(), 'uploads', imageName.imageName),
    );
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'inline; filename="' + imageName.imageName + '"',
    });
    return new StreamableFile(file);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storage,
      fileFilter: imageFileFilter,
      limits: { fileSize: 10485760 }, // maxsize = 10MB
    }),
  )
  async uploadProfilePicture(
    @UploadedFile()
    image: Express.Multer.File,

    @UserDecorator() user: User,
    @Res() res: Response,
  ) {
    await this.profilePictureService.updateProfilePicture(
      user.id,
      image.filename,
    );
    res.status(HttpStatus.OK);
    res.end();
  }
}
