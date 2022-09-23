import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ChannelStatusEnum } from '../enums/channel-enum';

export class UpdateChannelDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(ChannelStatusEnum, {
    message: 'Status should be either IDLE or LIVE',
  })
  status: ChannelStatusEnum;
}
