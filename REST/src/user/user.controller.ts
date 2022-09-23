import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseEntity } from './entities/user-response.entity';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 200,
    description: 'Users from database in an array',
    type: [UserResponseEntity],
  })
  @ApiOperation({
    description: 'Returns all the users from the database',
  })
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Returns the user with the given id',
    type: UserResponseEntity,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
  })
  @Get(':userId')
  async findOne(@Param('userId') userId: number, @Res() res: Response) {
    try {
      const data = await this.userService.getUserByIdExcludePassword(userId);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'User not found',
      });
    }
  }
}
