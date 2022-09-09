import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChannelService } from './channel.service';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Response } from 'express';
import { ChannelResponseEntity } from './entities/channel.entity';
import { CheckChannelUser } from './guards/check-user-channel.guard';
import { StreamKeyEntity } from 'src/video/enums/stream-key.entity';

@ApiTags('channel')
@Controller('')
export class ChannelController {
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
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const channel = await this.channelService.create(req.user.id);
      return res.status(HttpStatus.CREATED).send(channel);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @ApiOkResponse({
    status: 200,
    description: 'Get all the channels from the database',
    type: [ChannelResponseEntity],
  })
  @Get()
  async findAll() {
    return await this.channelService.findAll();
  }

  @ApiOkResponse({
    status: 200,
    description: 'Retrieve channel with id',
    type: ChannelResponseEntity,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Channel with that id not found',
  })
  @Get(':channelId')
  async findOne(@Param('channelId') channelId: number, @Res() res: Response) {
    try {
      const data = await this.channelService.findOne(channelId);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @Patch(':channelId')
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
    @Param('channelId') id: number,
    @Body() updateChannelDto: UpdateChannelDto,
    @Res() res: Response,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(await this.channelService.update(+id, updateChannelDto));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @ApiBearerAuth()
  @Delete(':channelId')
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @ApiResponse({
    status: 204,
    description: 'Channel has been deleted successfully.',
  })
  @ApiForbiddenResponse({
    description: 'User is not the owner of the channel',
  })
  @ApiNotFoundResponse({
    description: 'Channel not found',
  })
  async remove(@Param('channelId') channdelId: string, @Res() res: Response) {
    await this.channelService.remove(+channdelId);
    return res.status(HttpStatus.NO_CONTENT).json({
      message: 'Channel deleted successfully',
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, CheckChannelUser)
  @Patch(':channelId/streamKey')
  @ApiOkResponse({
    status: 200,
    description: 'Stream key updated successfully',
    type: StreamKeyEntity,
  })
  @ApiForbiddenResponse({
    description: 'User is not the owner of the channel',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Channel not found',
  })
  async updateStreamKey(
    @Param('channelId') channelId: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.channelService.updateStreamKey(+channelId);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @Post('streamKey/verify')
  @ApiOperation({
    description:
      'this route is only to be used by rtmp server to verify stream key',
  })
  @ApiCreatedResponse({
    status: 201,
    description: "Don't expect this response",
  })
  @ApiResponse({
    status: 302,
    description: 'returns rtmp redirect url',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Stream key is not valid',
  })
  async verifyStreamKey(
    @Body('streamKey') streamKey: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.channelService.getLatestStream(streamKey);
      return res
        .status(HttpStatus.FOUND)
        .redirect(`rtmp://0.0.0.0/hls-live/${data.url}`);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Post('streamKey/end')
  @ApiOperation({
    description:
      'this route ends the particular video stream also only to be used by rtmp server',
  })
  @ApiResponse({
    status: 200,
    description: 'Stream ended successfully',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Video not found',
  })
  @ApiCreatedResponse({
    status: 201,
    description: "Don't expect this response",
  })
  async endStream(@Body('name') streamKey: string, @Res() res: Response) {
    try {
      await this.channelService.endStream(streamKey);
      return res.status(HttpStatus.OK).json({ message: 'Stream ended' });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }
}
