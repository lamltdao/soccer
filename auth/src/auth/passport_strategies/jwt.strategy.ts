import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IUser } from 'src/users/interfaces/user-interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        let jwt = null;
        console.log(req.session);

        if (req && req.session.accessToken) {
          jwt = req.session.accessToken;
        }
        return jwt;
      },
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }
  // attach to req.user
  async validate(payload: { currentUser: IUser }) {
    return payload.currentUser;
  }
}
