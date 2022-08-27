import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
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
