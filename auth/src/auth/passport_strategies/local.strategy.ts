import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IUser } from 'src/users/interfaces/user-interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // AFTER this function is run is
  // the returned value attached as req.user
  async validate(emailIn: string, passwordIn: string): Promise<IUser> {
    const user = await this.authService.validateUser(emailIn, passwordIn);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}