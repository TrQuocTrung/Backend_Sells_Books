import { BadRequestException, Body, Controller, Get, HttpException, InternalServerErrorException, Post, Req, Res, UseGuards } from '@nestjs/common';
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
  @ResponseMessage("Login User")
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async handleLogin(
    @Req() req,
    @Res({ passthrough: true }) response: Response

  ) {
    try {
      const result = await this.authService.login(req.user, response);
      return response.status(200).json({
        statusCode: 200,
        message: "Đăng nhập thành công",
        data: result
      });
    } catch (error) {
      // Nếu lỗi là BadRequestException thì trả về lỗi client, còn lỗi khác trả về 500
      if (error instanceof BadRequestException) {
        return {
          statusCode: 400,
          message: error.message,
        };
      }
      // Log lỗi thật để debug
      console.error(error);
      return {
        statusCode: 500,
        message: error,
      };
    }
  }
  @Public()
  @ResponseMessage("Register a new user")
  @Post('/register')
  async handleRegister(
    @Body() registerUserDto: RegisterUserDto,

  ) {
    try {
      const result = await this.authService.register(registerUserDto);
      return {
        statusCode: 200,
        message: "Đăng Ký Tài Khoản thành công",
        data: {
          _id: result._id,
          createdAt: result.createdAt,
        },
      };
    } catch (error) {
      // Nếu lỗi là BadRequestException thì trả về lỗi client, còn lỗi khác trả về 500
      if (error instanceof BadRequestException) {
        return {
          statusCode: 400,
          message: error.message,
        };
      }
      // Log lỗi thật để debug
      console.error(error);
      return {
        statusCode: 500,
        message: error,
      };
    }
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
  async handleLogout(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser
  ) {
    try {
      await this.authService.logout(response, user);

      return {
        message: 'Đăng xuất thành công',
        success: true,
      };
    } catch (error) {
      console.error('Logout error:', error);
      throw new InternalServerErrorException('Đăng xuất thất bại. Vui lòng thử lại sau.');
    }
  }

}
