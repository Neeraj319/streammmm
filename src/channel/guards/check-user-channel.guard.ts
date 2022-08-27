import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Request } from 'express';
import { ChannelService } from '../channel.service';

@Injectable()
export class CheckChannelUser implements CanActivate {
  constructor(private readonly channelService: ChannelService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { user } = request;
    if (!(await this.channelService.getChannelByUserId(+user.id))) {
      return false;
    }
    return true;
  }
}
