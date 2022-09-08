import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CreateVideoDto } from './create-video.dto';
import { StreamStatusEnum } from '../enums/video.enum';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsString()
  @IsNotEmpty()
  @IsEnum(StreamStatusEnum, {
    message: 'Status must be one of the following: CREATED, RUNNING, ENDED',
  })
  status: StreamStatusEnum;
}
