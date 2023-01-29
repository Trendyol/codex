import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AnonymousGuard extends AuthGuard('anonymous') {
  handleRequest(err, user) {
    if (user) return user;
  }
}
