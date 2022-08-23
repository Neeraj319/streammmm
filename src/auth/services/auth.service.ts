import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async genToken(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    let user: User;
    user = await this.userService.authenticateUser(username, password);
    const accessToken = await this.tokenService.genAccessToken(user);
    const refreshToken = await this.tokenService.genRefreshToken(user);
    return {
      accessToken,
      refreshToken,
    };
  }

  async addUser(user: CreateUserDto) {
    await this.userService.addUser(user);
  }
}
