import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,

    ) { }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && this.usersService.isValidPassword(password, user.password)) {
            const { password, ...result } = user.toObject(); // hoặc user._doc
            return result;
        }
        return null;
    }
    async login(user: IUser) {
        const { _id, username, email, role } = user;
        const payload = {
            sub: "token login",
            iss: "from server",
            _id,
            username,
            email,
            role
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                _id,
                username,
                email,
                role,
            },
        };
    }
    async register(user: RegisterUserDto) {
        let newUser = await this.usersService.register(user);
        return {
            _id: newUser?._id,
            createdAt: newUser?.createdAt
        };
    }

}
