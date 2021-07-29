import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // AFTER this function is run is
  // the returned value attached as req.user
  async validate(
    emailIn: string,
    passwordIn: string,
  ): Promise<UserResponseDto> {
    const user = await this.authService.validateUser(emailIn, passwordIn);
    if (!user) {
      throw new BadRequestException('Either email or password is incorrect');
    }
    return user;
  }
}
