import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @NotContains(' ', { message: 'username should not contain spaces' })
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
