import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  NotContains,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @NotContains(' ', { message: 'username should not contain spaces' })
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  last_name: string;
}
