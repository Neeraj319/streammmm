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
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChannelService } from './channel.service';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Response } from 'express';
import { ChannelResponseEntity } from './entities/channel.entity';
import { CheckChannelUser } from './guards/check-user-channel.guard';

@ApiTags('channel')
@Controller('')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiCreatedResponse({
    status: 201,
    description: 'Channel has been successfully created.',
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
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
  @ApiCreatedResponse({
    status: 200,
    description: 'Retrieve all channels from the database',
    type: [ChannelResponseEntity],
  })
  @Get()
  async findAll() {
    return await this.channelService.findAll();
  }

  @ApiCreatedResponse({
    status: 200,
    description: 'Retrieve channel with id',
    type: ChannelResponseEntity,
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
  @ApiCreatedResponse({
    status: 200,
    description: 'Channel has been updated successfully.',
    type: ChannelResponseEntity,
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
  @ApiCreatedResponse({
    status: 204,
    description: 'Channel has been deleted successfully.',
    type: ChannelResponseEntity,
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
  @ApiCreatedResponse({
    status: 200,
    description: 'Update channel stream key',
    type: ChannelResponseEntity,
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
  @ApiCreatedResponse({
    status: 302,
    description: 'returns rtmp redirect url',
    type: ChannelResponseEntity,
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
  @ApiCreatedResponse({
    status: 200,
    description: 'End stream',
  })
  async endStream(
    @Body('name') streamKey: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      await this.channelService.endStream(streamKey);
      return res.status(HttpStatus.OK).json({ message: 'Stream ended' });
    } catch (error) {
      console.log(error.message);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
