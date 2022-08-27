import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from '@prisma/client';

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

  async create(userId: number) {
    if (await this.getChannelByUserId(userId)) {
      throw new Error('User already has a channel');
    }
    await this.prismaService.channel.create({
      data: {
        userId: userId,
      },
    });
  }

  async findAll(): Promise<Channel[]> {
    return await this.prismaService.channel.findMany();
  }

  async findOne(channelId: number): Promise<Channel> {
    return await this.prismaService.channel.findFirstOrThrow({
      where: {
        id: channelId,
      },
    });
  }

  async update(channleId: number, updateChannelDto: UpdateChannelDto) {
    await this.prismaService.channel.update({
      where: {
        id: channleId,
      },
      data: {
        status: updateChannelDto.status,
      },
    });
    return await this.findOne(channleId);
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
