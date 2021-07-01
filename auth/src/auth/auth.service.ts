import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'src/users/helpers/hash-password';
import { IUser } from 'src/users/interfaces/user-interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, passwordIn: string) : Promise<IUser> {
    const user = await this.usersService.findOne(email);
    if(user && compare(user.password, passwordIn)) {
      const { password, _id:id, __v, ...userInfo } = user.toObject();
      return {...userInfo, id}
    }
    return undefined;
  }

  async login(user: IUser) {
    const payload = { currentUser: user };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  async loginWithGgl(user) {
    console.log(user);
    
  }
}
