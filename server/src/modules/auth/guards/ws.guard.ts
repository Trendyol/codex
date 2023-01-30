import { ACCESS_TOKEN } from '@auth/models/constants';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const client: Socket = context.switchToWs().getClient();

      const access_token = this.getCookieValue(client.handshake.headers.cookie, ACCESS_TOKEN);
      const user = this.jwtService.verify(access_token);

      const request = context.switchToHttp().getRequest();
      request.user = user;

      return true;
    } catch (e) {}
    return false;
  }

  getCookieValue(cookie, name) {
    return cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
  }
}
