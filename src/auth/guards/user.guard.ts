import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CheckUserGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { userId } = request.params;
    const { user } = request;
    return user['id'] == +userId;
  }
}
