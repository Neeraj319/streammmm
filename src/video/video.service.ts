import { Injectable } from '@nestjs/common';
import { ChannelService } from 'src/channel/channel.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { randomStringGenerator } from '../utils/utils';

@Injectable()
export class VideoService {
  constructor(
    private readonly prismaSerivce: PrismaService,
    private readonly channelService: ChannelService,
  ) {}
  async create(channelId: number, createVideoDto: CreateVideoDto) {
    return await this.prismaSerivce.video.create({
      data: {
        channelId: +channelId,
        url: randomStringGenerator(),
        ...createVideoDto,
      },
    });
  }

  async findAll() {
    return await this.prismaSerivce.video.findMany();
  }

  async findAllByChannel(channelId: number) {
    await this.channelService.findOne(channelId);
    return await this.prismaSerivce.video.findMany({
      where: {
        channelId: +channelId,
      },
    });
  }

  async findOne(channelId: number, id: number) {
    return await this.prismaSerivce.video.findFirstOrThrow({
      where: {
        id: +id,
        channelId: +channelId,
      },
    });
  }

  async update(videoId: number, updateVideoDto: UpdateVideoDto) {
    return await this.prismaSerivce.video.update({
      where: {
        id: +videoId,
      },
      data: {
        ...updateVideoDto,
      },
    });
  }

  async remove(id: number) {
    try {
      return await this.prismaSerivce.video.delete({
        where: {
          id: +id,
        },
      });
    } catch (e) {
      throw new Error('Video not found');
    }
  }
}
