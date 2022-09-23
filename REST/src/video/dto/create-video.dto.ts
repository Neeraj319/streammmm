import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  title: string;
}
