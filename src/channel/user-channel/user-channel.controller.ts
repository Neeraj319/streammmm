import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpStatus,
  UseGuards,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ChannelService } from '../channel.service';
import { Response } from 'express';
import { ChannelResponseEntity } from '../entities/channel.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CheckChannelUser } from '../guards/check-user-channel.guard';
import { UpdateChannelDto } from '../dto/update-channel.dto';
import { StreamKeyEntity } from 'src/video/enums/stream-key.entity';
import { User as UserDecorator } from 'src/user/decoratos/request-user.decorator';
import { UserEnity } from 'src/user/entities/user.entity';

@ApiTags('User Channel')
@Controller('')
export class UserChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiCreatedResponse({
    status: 201,
    description: 'Channel has been successfully created.',
    type: ChannelResponseEntity,
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBadRequestResponse({
    status: 400,
    description: 'User already has a channel',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'User not authorized',
  })
  async create(@UserDecorator() user: UserEnity, @Res() res: Response) {
    try {
      const channel = await this.channelService.create(user.id);
      return res.status(HttpStatus.CREATED).send(channel);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @Patch('')
  @ApiOkResponse({
    status: 200,
    description: 'Channel has been updated successfully.',
    type: ChannelResponseEntity,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Request body is not valid',
  })
  @ApiForbiddenResponse({
    description: 'User is not the owner of the channel',
  })
  @ApiNotFoundResponse({
    description: 'Channel not found',
  })
  async update(
    @Body() updateChannelDto: UpdateChannelDto,
    @Res() res: Response,
    @UserDecorator() user: UserEnity,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(await this.channelService.update(user.id, updateChannelDto));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @ApiBearerAuth()
  @Delete('')
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @ApiResponse({
    status: 204,
    description: 'Channel has been deleted successfully.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Login Token not valid',
  })
  @ApiNotFoundResponse({
    description: 'Channel not found',
  })
  async remove(@Res() res: Response, @UserDecorator() user: UserEnity) {
    await this.channelService.remove(user.channel.id);
    return res.status(HttpStatus.NO_CONTENT).json({
      message: 'Channel deleted successfully',
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @Patch('streamKey')
  @ApiOkResponse({
    status: 200,
    description: 'Stream key updated successfully',
    type: StreamKeyEntity,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User has no Channel',
  })
  async updateStreamKey(
    @Res() res: Response,
    @UserDecorator() user: UserEnity,
  ) {
    try {
      const data = await this.channelService.updateStreamKey(user.channel.id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: "Get user's channel",
    type: ChannelResponseEntity,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User has no channel',
  })
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @Get('')
  async findOne(@Res() res: Response, @UserDecorator() user: UserEnity) {
    try {
      const data = await this.channelService.getChannelByUserId(user.id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }
}
