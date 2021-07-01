import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { GGlOauth20AuthGuard } from './auth/guards/ggl-oauth20-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller('/api/auth')
export class AppController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {  
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/currentUser')
  getCurrentUser(@Request() req) {
    return req.user;
  }

  @UseGuards(GGlOauth20AuthGuard)
  @Get('/google')
  async gglAuth(@Request() req) {}

  @UseGuards(GGlOauth20AuthGuard)
  @Get('/google/redirect')
  async gglAuthRedirect(@Request() req) {
    return this.authService.loginWithGgl(req.user)
  }
}
