import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  handleLogin(@Req() req) {
    return this.authService.login(req.user);
  }

}
