import {
  Controller,
  Body,
  Patch,
  UseGuards,
  Res,
  HttpStatus,
  Get,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User as UserDecorator } from '../decoratos/request-user.decorator';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseEntity } from '../entities/user-response.entity';
import { UserService } from '../user.service';

@Controller('')
@ApiTags('Authenticated User')
export class UserAuthenticatedController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Returns the user with the given id',
    type: UserResponseEntity,
  })
  @UseGuards(JwtAuthGuard)
  @Get('')
  async findOne(@Res() res: Response, @UserDecorator() user: User) {
    try {
      const data = await this.userService.getUserByIdExcludePassword(user.id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'User not found',
      });
    }
  }

  @ApiBearerAuth()
  @Patch('')
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
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
    @UserDecorator() user: User,
  ) {
    try {
      const user_from_db = await this.userService.updateUser(
        user.id,
        updateUserDto,
      );
      return res.status(HttpStatus.OK).json(user_from_db);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }
}
