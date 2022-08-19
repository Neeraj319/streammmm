import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/user/:id')
  async getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }
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
}
