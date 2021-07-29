import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Redirect,
  Session,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { GGlOauth20AuthGuard } from './auth/guards/ggl-oauth20-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { ApiBody, ApiHeader, ApiOkResponse } from '@nestjs/swagger';
import { UserLoginDto } from './users/dto/user-login.dto';
import { CurrentUserResponseDto } from './users/dto/current-user-response.dto';

@Controller('auth')
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiBody({ type: UserLoginDto })
  login(@Request() req, @Session() session) {
    const res = this.authService.login(req.user);
    session.accessToken = res.accessToken;
    return res;
  }

  @Delete('/logout')
  @HttpCode(204)
  logout(@Session() session) {
    if (session.accessToken) {
      delete session.accessToken;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/currentUser')
  @ApiHeader({
    name: 'Cookie',
    description: 'a jwt token',
  })
  @ApiOkResponse({
    type: CurrentUserResponseDto,
  })
  getCurrentUser(@Request() req) {
    return req.user;
  }

  @UseGuards(GGlOauth20AuthGuard)
  @Get('/google')
  async gglAuth(@Request() req) {}

  @UseGuards(GGlOauth20AuthGuard)
  @Get('/google/redirect')
  @Redirect(`${process.env.BASE_URL}`)
  async gglAuthRedirect(@Request() req) {
    return this.authService.loginWithGgl(req.user);
  }
}
