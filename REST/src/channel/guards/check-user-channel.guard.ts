import {
  ExecutionContext,
  Injectable,
  CanActivate,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { ChannelService } from '../channel.service';
import { ChannelEntity } from '../entities/channel.entity';

@Injectable()
export class CheckChannelUser implements CanActivate {
  constructor(private readonly channelService: ChannelService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { user } = request;
    const userChannel = await this.channelService.getChannelByUserId(+user.id);
    if (!userChannel) {
      throw new NotFoundException('User does not have a channel');
    }
    request.user.channel = userChannel as ChannelEntity;
    return true;
  }
}
