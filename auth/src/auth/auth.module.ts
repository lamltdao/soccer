import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport_strategies/jwt.strategy';
import { LocalStrategy } from './passport_strategies/local.strategy';
import { GoogleOauth20Strategy } from './passport_strategies/google.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  // change to registerAsync to wait for ConfigModule to load .env
  imports: [UsersModule, PassportModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      return {
        secret: config.get<string>('JWT_SECRET'),
        // signOptions: { expiresIn: '60s' }
      }
    }
})],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleOauth20Strategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
