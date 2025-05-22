import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Public, ResponseMessage, User } from 'src/decotator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/user.interface';
import { RoleService } from 'src/role/role.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private roleService: RoleService
  ) { }
  @Public()
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  handleLogin(
    @Req() req,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(req.user, response);
  }
  @Public()
  @ResponseMessage("Register a new user")
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @ResponseMessage("Get user information")
  @Get('/account')
  async handleGetAccount(@User() user: IUser) {
    const temp = await this.roleService.findOne(user.role._id) as any;
    user.permissions = temp.permissions;
    return { user };
  }
  @ResponseMessage("Logout User")
  @Post('/logout')
  handleLogout(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser
  ) {
    return this.authService.logout(response, user);
  }
}
