import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseEntity } from './entities/user-response.entity';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CheckUserGuard } from 'src/auth/guards/user.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 200,
    description: 'Returns all the users from the database',
    type: [UserResponseEntity],
  })
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Returns all the users from the database',
    type: UserResponseEntity,
  })
  @Get(':userId')
  async findOne(@Param('userId') userId: number, @Res() res: Response) {
    const data = await this.userService.getUserByIdExcludePassword(userId);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    }
    return res.status(HttpStatus.NOT_FOUND).json({
      message: 'User not found',
    });
  }

  @ApiBearerAuth()
  @Patch(':userId')
  @UseGuards(JwtAuthGuard, CheckUserGuard)
  async update(
    @Param('userId') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.updateUser(id, updateUserDto);
      return res.status(HttpStatus.OK).json(user);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }
}
