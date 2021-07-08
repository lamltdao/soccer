import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IUser } from 'src/users/interfaces/user-interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        let jwt = null;
        // @ts-ignore
        if (req && req.session.accessToken) {
          // @ts-ignore
          jwt = req.session.accessToken!;
        }
        return jwt;
      },
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }
  // attach to req.user
  async validate(payload: { currentUser: IUser, iat: number, exp: number }) {
    return {currentUser: payload.currentUser};
  }
}
