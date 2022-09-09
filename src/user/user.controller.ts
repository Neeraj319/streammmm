import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserResponseEntity } from './entities/user-response.entity';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CheckUserGuard } from 'src/auth/guards/user.guard';

@ApiTags('user')
@Controller('user')
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

  @ApiBearerAuth()
  @Patch(':userId')
  @ApiBadRequestResponse({
    status: 400,
    description: 'Properties not provided correctly',
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'Tried to update some other user',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserResponseEntity,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'User is not logged in',
  })
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
