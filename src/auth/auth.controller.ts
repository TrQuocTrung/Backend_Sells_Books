import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Public, ResponseMessage } from 'src/decotator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Public()
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  handleLogin(@Req() req) {
    return this.authService.login(req.user);
  }
  @Public()
  @ResponseMessage("Register a new user")
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
