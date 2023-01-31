import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';

import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly dataService: IDataService,
  ) {}

  async handleAuth(user: UserDto) {
    const { email, name, avatar} = user;
    let signedUser;

    try {
      signedUser = await this.dataService.users.findOne({ email });
    } catch {
      signedUser = await this.userService.create(name, email, avatar);
    } finally {
      return this.jwtService.sign({
        id: signedUser.id,
        email: signedUser.email,
        name: signedUser.name,
        avatar: signedUser.avatar,
        role: signedUser.role,
      });
    }
  }
}
