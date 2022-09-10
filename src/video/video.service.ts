import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ChannelService } from 'src/channel/channel.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { randomStringGenerator } from '../utils/utils';
import { time } from 'console';

@Injectable()
export class VideoService {
  constructor(
    private readonly prismaSerivce: PrismaService,
    @Inject(forwardRef(() => ChannelService))
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
  async findLast() {
    return await this.prismaSerivce.video.findFirst({
      orderBy: {
        id: 'desc',
      },
    });
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

  async update(
    videoId: number,
    updateVideoDto: UpdateVideoDto,
    channelId: number,
  ) {
    await this.prismaSerivce.video.updateMany({
      where: {
        id: +videoId,
        channelId: +channelId,
      },
      data: {
        ...updateVideoDto,
      },
    });
    return await this.prismaSerivce.video.findMany({
      where: {
        id: +videoId,
        channelId: +channelId,
      },
    });
  }
  async updateVideoStatus(videoId: number, updateVideoDto: UpdateVideoDto) {
    return await this.prismaSerivce.video.update({
      where: {
        id: +videoId,
      },
      data: {
        ...updateVideoDto,
      },
    });
  }
  async getVideoByFileName(fileName: string) {
    return await this.prismaSerivce.video.findFirst({
      where: {
        url: fileName,
      },
    });
  }

  async remove(id: number, channelId: number) {
    return await this.prismaSerivce.video.deleteMany({
      where: {
        id: +id,
        channelId: channelId,
      },
    });
  }
}
