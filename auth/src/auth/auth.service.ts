import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
    if(user && await bcrypt.compare(passwordIn, user.password)) {
      const { password, _id:id, __v, ...userInfo } = user.toObject();
      return {...userInfo, id}
    }
    throw new BadRequestException('Either email or password is incorrect');
  }
  
  login(user: IUser) {
    const payload = { currentUser: user };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken
    };
  }
  async loginWithGgl(user) {
    console.log(user);
  }
}
