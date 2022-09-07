import {
  ExecutionContext,
  Injectable,
  CanActivate,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { ChannelService } from '../channel.service';
import { ChannelResponseEntity } from '../entities/channel.entity';

@Injectable()
export class CheckChannelUser implements CanActivate {
  constructor(private readonly channelService: ChannelService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { user } = request;
    const { channelId } = request.params;

    const userChannel = await this.channelService.getChannelByUserId(+user.id);
    let channel: ChannelResponseEntity;
    try {
      channel = await this.channelService.findOne(+channelId);
    } catch (e) {
      throw new NotFoundException('Channel not found');
    }

    if (!channel) {
      throw new NotFoundException('Channel not found');
    }
    if (userChannel.id !== +channelId) {
      return false;
    }
    return true;
  }
}
