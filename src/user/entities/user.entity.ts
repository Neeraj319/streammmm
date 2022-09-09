import { ChannelEntity } from 'src/channel/entities/channel.entity';

export class UserEnity {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  refreshToken: string;
  channel: ChannelEntity;
  password: string;
}
