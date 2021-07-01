import { Strategy } from 'passport-google-oauth20';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class GoogleOauth20Strategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GGL_OAUTH_CLIENT_ID,
      clientSecret: process.env.GGL_OAUTH_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    console.log("Profile", profile);
    const user = {
      name: profile.displayName,
      email: profile.emails[0].value,
      username: profile.displayName.replace(/\s+/g, '') // remove spaces in a string
      // avatarUrl: profile.photos[0].value
    }
    done(null, user);
  }
}