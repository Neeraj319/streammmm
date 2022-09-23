import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { UserResponseEntity } from 'src/user/entities/user-response.entity';
import { TokensEntity } from './entities/tokens.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup/')
  @ApiCreatedResponse({
    status: 201,
    description: 'User has been successfully created.',
    type: UserResponseEntity,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid fields or user already exists.',
  })
  async createUser(@Res() res: Response, @Body() userDto: CreateUserDto) {
    try {
      const user = await this.authService.addUser(userDto);
      return res.set(HttpStatus.CREATED).json(user);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  @Post('login')
  @ApiCreatedResponse({
    status: 201,
    description: 'Access and Refresh token generated successfully',
    type: TokensEntity,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid username and password',
  })
  async loginUser(@Res() res: Response, @Body() userDto: LoginUserDto) {
    try {
      const { accessToken, refreshToken } = await this.authService.genToken(
        userDto.username,
        userDto.password,
      );
      return res.status(201).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }
  @Post('refresh')
  @ApiCreatedResponse({
    status: 201,
    description: 'Access and Refresh token generated successfully',
    type: TokensEntity,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid refresh token',
  })
  async getRefreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response,
  ) {
    try {
      return res.send(
        await this.authService.genTokenByRefreshToken(
          refreshTokenDto.refreshToken,
        ),
      );
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }
}
