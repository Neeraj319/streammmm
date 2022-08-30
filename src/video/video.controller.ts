import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { CheckChannelUser } from 'src/channel/guards/check-user-channel.guard';

@Controller('')
@ApiTags('channel-videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('')
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  async create(
    @Body() createVideoDto: CreateVideoDto,
    @Req() req: Request,
    @Param('channelId') channelId: number,
    @Res() res: Response,
  ) {
    const data = await this.videoService.create(channelId, createVideoDto);
    return res.status(HttpStatus.CREATED).json(data);
  }

  @Get()
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
  async findOne(
    @Param('videoId') videoId: string,
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

  @Patch(':videoId')
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  async update(
    @Param('videoId') videoId: number,
    @Body() updateVideoDto: UpdateVideoDto,
    @Res() res: Response,
  ) {
    try {
      return await this.videoService.update(+videoId, updateVideoDto);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
      });
    }
  }
  @Delete(':videoId')
  async remove(@Param('videoId') videoId: number, @Res() res: Response) {
    try {
      await this.videoService.remove(+videoId);
      return res.status(HttpStatus.OK).json({
        message: 'Video removed',
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
      });
    }
  }
}
