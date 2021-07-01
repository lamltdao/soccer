import { Strategy } from 'passport-google-oauth20';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class GoogleOauth20Strategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GGL_OAUTH_CLIENT_ID,
      clientSecret: process.env.GGL_OAUTH_CLIENT_SECRET,
      callbackURL: 'http://lamproject.xyz/api/auth/google/redirect' 
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    console.log(profile);
  }
}