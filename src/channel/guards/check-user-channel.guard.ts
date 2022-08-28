import {
  ExecutionContext,
  Injectable,
  CanActivate,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { ChannelService } from '../channel.service';

@Injectable()
export class CheckChannelUser implements CanActivate {
  constructor(private readonly channelService: ChannelService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { user } = request;
    const { channelId } = request.params;

    const channel = await this.channelService.getChannelByUserId(+user.id);

    if (!channel) {
      throw new NotFoundException('channel not found');
    }
    if (channel.id !== +channelId) {
      return false;
    }
    return true;
  }
}
