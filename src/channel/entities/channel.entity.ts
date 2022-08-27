import { ChannelStatusEnum } from '../enums/channel-enum';

export class ChannelResponseEntity {
  id: number;
  userId: number;
  status: ChannelStatusEnum;
}
