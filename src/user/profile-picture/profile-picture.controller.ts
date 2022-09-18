import {
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProfilePictureService } from './profile-picture.service';
import { imageFileFilter, storage } from './utils/image-store.utils';

@Controller('')
@ApiTags('User Profile Picture')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  @Get('')
  async getProfilePicture() {
    return 'profile picture';
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
  ) {
    return 'done';
  }
}
