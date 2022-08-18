import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/user/:id')
  async getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }
}
