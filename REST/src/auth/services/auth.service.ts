import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserResponseEntity } from 'src/user/entities/user-response.entity';
import { UserService } from 'src/user/user.service';
import { RefreshTokenPayload } from '../entities/refreshToken.entity';
import { TokensEntity } from '../entities/tokens.entity';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async genToken(username: string, password: string): Promise<TokensEntity> {
    let user: User;
    let refreshToken: string;
    user = await this.userService.authenticateUser(username, password);

    const accessToken = await this.tokenService.genAccessToken(user);

    refreshToken = await this.tokenService.genRefreshToken(user);

    await this.userService.updateRefreshToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }
  async genTokenByRefreshToken(refreshToken: string): Promise<TokensEntity> {
    const result = await this.tokenService.decodeToken<RefreshTokenPayload>(
      refreshToken,
    );
    const user = await this.userService.getUserById(result.userId);
    if (user.refreshToken !== refreshToken) {
      throw new Error('Invalid refresh token');
    }
    const data = await this.tokenService.genAccessToken(user);
    const refreshTokenNew = await this.tokenService.genRefreshToken(user);
    await this.userService.updateRefreshToken(user.id, refreshTokenNew);
    return {
      accessToken: data,
      refreshToken: refreshTokenNew,
    };
  }

  async addUser(user: CreateUserDto): Promise<UserResponseEntity> {
    return await this.userService.addUser(user);
  }
}
