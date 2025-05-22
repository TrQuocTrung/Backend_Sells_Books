
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/user.interface';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private roleService: RoleService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
        });
    }

    async validate(payload: IUser) {
        const { _id, username, email, role } = payload;
        // cần gán thêm permissions vào req.user
        const userRole = role as unknown as { _id: string; name: string }
        const temp = (await this.roleService.findOne(userRole._id)).toObject();

        if (!temp) {
            throw new BadRequestException("Role không tồn tại trong hệ thống");
        }
        //req.user
        return {
            _id,
            username,
            email,
            role,
            permissions: temp?.permissions ?? []
        };
    }
}
