import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from '@prisma/client';
import { randomStringGenerator } from '../utils/utils';
import { ChannelResponseEntity } from './entities/channel.entity';
@Injectable()
export class ChannelService {
  constructor(private readonly prismaService: PrismaService) {}

  async getChannelByUserId(userId: number): Promise<Channel> {
    return await this.prismaService.channel.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async create(userId: number): Promise<Channel> {
    if (await this.getChannelByUserId(userId)) {
      throw new Error('User already has a channel');
    }

    return await this.prismaService.channel.create({
      data: {
        userId: userId,
        streamKey: randomStringGenerator(),
      },
    });
  }

  async findAll(): Promise<ChannelResponseEntity[]> {
    return await this.prismaService.channel.findMany({
      select: {
        id: true,
        status: true,
        userId: true,
      },
    });
  }

  async findOne(channelId: number): Promise<ChannelResponseEntity> {
    return await this.prismaService.channel.findFirstOrThrow({
      where: {
        id: channelId,
      },
      select: {
        id: true,
        status: true,
        userId: true,
      },
    });
  }

  async update(
    channleId: number,
    updateChannelDto: UpdateChannelDto,
  ): Promise<ChannelResponseEntity> {
    return await this.prismaService.channel.update({
      where: {
        id: channleId,
      },
      data: {
        status: updateChannelDto.status,
      },
      select: {
        id: true,
        status: true,
        userId: true,
      },
    });
  }

  remove(channelId: number) {
    return this.prismaService.channel.delete({
      where: {
        id: channelId,
      },
    });
  }

  updateStreamKey(channelId: number) {
    return this.prismaService.channel.update({
      where: {
        id: channelId,
      },
      data: {
        streamKey: randomStringGenerator(),
      },
      select: {
        streamKey: true,
      },
    });
  }
}
