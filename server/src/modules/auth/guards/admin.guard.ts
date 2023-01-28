import { Roles } from '@auth/models/constants';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }
    const user = request.user;
    return user.role === Roles.ADMIN;
  }
}
