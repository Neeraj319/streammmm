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
      type: 'access',
    } as JwtAccessTokenPayload;
    return await this.jwtService.signAsync(result);
  }

  async genRefreshToken(user: User): Promise<string> {
    const payLoad = {
      userId: user.id,
      type: 'refresh',
    } as RefreshTokenPayload;

    const newToken = this.jwtService.signAsync(payLoad, {
      expiresIn: this.configService.get('jwt.refreshExpiresIn', {
        infer: true,
      }),
    });
    return newToken;
  }

  async decodeToken<T extends JwtAccessTokenPayload | RefreshTokenPayload>(
    token: string,
  ): Promise<T> {
    return await this.jwtService.verifyAsync(token);
  }
}
