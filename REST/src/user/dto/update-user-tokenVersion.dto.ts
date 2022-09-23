import { IsNumber, IsOptional } from 'class-validator';

export class UpdateUserTokenVerDto {
  @IsOptional()
  @IsNumber()
  tokenVersion: number;
}
