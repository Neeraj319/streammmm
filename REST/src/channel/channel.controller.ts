import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ChannelService } from './channel.service';
import { ChannelResponseEntity } from './entities/channel.entity';

@ApiTags('channel')
@Controller('')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

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
