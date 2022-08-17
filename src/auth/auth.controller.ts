import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/user/:id')
  async getUser(@Param() params): Promise<any> {
    return this.authService.getUser(params.id);
  }
}
