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
      await this.channelService.create(req.user.id);
      return res.status(HttpStatus.CREATED).send();
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
  @Patch(':id')
  @ApiCreatedResponse({
    status: 200,
    description: 'Channel has been updated successfully.',
    type: ChannelResponseEntity,
  })
  async update(
    @Param('id') id: number,
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
}
