import { Controller, Get, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { VideoEntity } from './video/entities/video.entity';
import { VideoService } from './video/video.service';

@Controller()
export class AppController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getHello(): string {
    return 'Welcome to the API go to /docs for documentation';
  }
  @Get('videos')
  @ApiTags('videos')
  @ApiResponse({
    status: 200,
    description: 'returns all the videos',
    type: [VideoEntity],
  })
  async findAll(@Req() req: Request) {
    console.log(req.headers);
    return await this.videoService.findAll();
  }
}
