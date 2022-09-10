import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { VideoEntity } from '../entities/video.entity';
import { CreateVideoDto } from '../dto/create-video.dto';
import { VideoService } from '../video.service';
import { CheckChannelUser } from 'src/channel/guards/check-user-channel.guard';
import { Response } from 'express';
import { UpdateVideoDto } from '../dto/update-video.dto';
import { User as UserDecorator } from 'src/user/decoratos/request-user.decorator';
import { UserEnity } from 'src/user/entities/user.entity';

@Controller('')
@ApiTags('User Channel Videos')
export class UserChannelVideosController {
  constructor(private readonly videoService: VideoService) {}

  @Post('')
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    status: 201,
    description: 'Video/Stream created successfully',
    type: VideoEntity,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid Request body',
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'User is not the owner of the channel',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Channel not found',
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'User is not logged in',
  })
  @ApiBearerAuth()
  async create(
    @Body() createVideoDto: CreateVideoDto,
    @Res() res: Response,
    @UserDecorator() user: UserEnity,
  ) {
    const data = await this.videoService.create(
      user.channel.id,
      createVideoDto,
    );
    return res.status(HttpStatus.CREATED).json(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @ApiOkResponse({
    status: 200,
    description: 'All the videos of the channel',
    type: [VideoEntity],
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Channel not found',
  })
  @ApiBearerAuth()
  async findAll(@Res() res: Response, @UserDecorator() user: UserEnity) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(await this.videoService.findAllByChannel(user.channel.id));
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
      });
    }
  }

  @Get(':videoId')
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @ApiOkResponse({
    status: 200,
    description: 'Video found',
    type: VideoEntity,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Video/Channel not found',
  })
  @ApiBearerAuth()
  async findOne(
    @Param('videoId') videoId: string,
    @Res() res: Response,
    @UserDecorator() user: UserEnity,
  ) {
    try {
      return await this.videoService.findOne(user.channel.id, +videoId);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
      });
    }
  }

  @Patch(':videoId')
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid Request body',
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'User is not the owner of the channel',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Video/Channel not found',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Video updated successfully',
    type: VideoEntity,
  })
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @ApiBearerAuth()
  async update(
    @Param('videoId') videoId: number,
    @Body() updateVideoDto: UpdateVideoDto,
    @Res() res: Response,
    @UserDecorator() user: UserEnity,
  ) {
    const data = await this.videoService.update(
      +videoId,
      updateVideoDto,
      user.channel.id,
    );
    if (!(data.length > 0)) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Video not found',
      });
    }
    return res.status(HttpStatus.OK).json(data[0]);
  }

  @Delete(':videoId')
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @ApiBearerAuth()
  @ApiForbiddenResponse({
    status: 403,
    description: 'User is not the owner of the channel',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Video/Channel not found',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Video Deleted successfully',
  })
  async remove(
    @Param('videoId') videoId: number,
    @Res() res: Response,
    @UserDecorator() user: UserEnity,
  ) {
    const data = await this.videoService.remove(+videoId, user.channel.id);
    if (!(data.count > 0)) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: 'Video not found',
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'Video removed',
    });
  }
}
