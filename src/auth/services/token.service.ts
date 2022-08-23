import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { JwtAccessTokenPayload } from '../entities/accessToken.entity';
import { RefreshTokenPayload } from '../entities/refreshToken.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IConfig>,
  ) {}

  async genAccessToken(user: User): Promise<string> {
    const result = {
      userId: user.id,
      username: user.username,
    } as JwtAccessTokenPayload;
    return await this.jwtService.signAsync(result);
  }

  async genRefreshToken(user: User): Promise<string> {
    const result = {
      userId: user.id,
      version: user.tokenVersion,
    } as RefreshTokenPayload;
    return await this.jwtService.signAsync(result, {
      expiresIn: this.configService.get('jwt.refreshExpiresIn', {
        infer: true,
      }),
    });
  }
  async decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
    return this.jwtService.verifyAsync(token);
  }
}
