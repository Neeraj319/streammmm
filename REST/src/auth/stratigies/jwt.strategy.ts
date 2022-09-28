import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { JwtAccessTokenPayload } from '../entities/accessToken.entity';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let data = req.cookies['accessToken'];
          if (data) {
            return data;
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret', { infer: true }),
    });
  }

  async validate(payload: JwtAccessTokenPayload): Promise<User> {
    return await this.userService.getUserById(payload.userId);
  }
}
