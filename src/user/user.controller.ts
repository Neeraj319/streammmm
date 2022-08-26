import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseEntity } from './entities/user.entity';
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
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const data = await this.userService.getUserByIdExcludePassword(id);
    if (data) {
      return data;
    }
    return res.status(HttpStatus.NOT_FOUND).json({
      message: 'User not found',
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, CheckUserGuard)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {}
  @Delete(':id')
  remove(@Param('id') id: string) {}
}
