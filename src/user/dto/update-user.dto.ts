import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  username?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  first_name?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  last_name?: string;
}
