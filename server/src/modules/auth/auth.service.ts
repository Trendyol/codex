import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';

import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async handleAuth(user: UserDto) {
    const { email, name } = user;
    let signedUser;

    try {
      signedUser = await this.userService.findOne({ email });
    } catch {
      signedUser = await this.userService.create(name, email);
    } finally {
      return this.jwtService.sign({
        id: signedUser.id,
        email: signedUser.email,
        name: signedUser.name,
        role: signedUser.role,
      });
    }
  }
}
