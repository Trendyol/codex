import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';

import { UserDTO } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async handleAuth(user: UserDTO) {
    const { email, name } = user;
    let signedUser;

    try {
      signedUser = await this.userService.findOne({ email });
    } catch {
      signedUser = await this.userService.create(name, email);
    } finally {
      return this.jwtService.sign({ email: signedUser.email, name: signedUser.name });
    }
  }
}
