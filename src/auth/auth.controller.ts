import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup/')
  @ApiCreatedResponse({
    status: 201,
    description: 'User has been successfully created.',
  })
  async createUser(
    @Res() res: Response,
    @Body() userDto: CreateUserDto,
  ): Promise<object> {
    try {
      await this.authService.addUser(userDto);
      return res.set(HttpStatus.CREATED).json({
        message: 'user created successfully',
      });
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
  })
  async loginUser(
    @Res() res: Response,
    @Body() userDto: LoginUserDto,
  ): Promise<Response> {
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
