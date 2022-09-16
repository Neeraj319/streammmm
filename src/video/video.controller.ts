import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { VideoEntity } from './entities/video.entity';
import { VideoService } from './video.service';

@Controller('')
@ApiTags('Channel Videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'All the videos of the channel',
    type: [VideoEntity],
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Channel not found',
  })
  async findAll(@Param('channelId') channelId: number, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(await this.videoService.findAllByChannel(channelId));
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
      });
    }
  }

  @Get(':videoId')
  @ApiOkResponse({
    status: 200,
    description: 'Video found',
    type: VideoEntity,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Video/Channel not found',
  })
  async findOne(
    @Param('videoId') videoId: number,
    @Param('channelId') channelId: number,
    @Res() res: Response,
  ) {
    try {
      return await this.videoService.findOne(+channelId, +videoId);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
      });
    }
  }
}
