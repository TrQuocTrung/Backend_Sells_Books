import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

class Profile {
    @IsNotEmpty()
    fullname: string
    @IsNotEmpty()
    gender: string
    @IsNotEmpty()
    address: string
    @IsNotEmpty()
    @IsNumber({}, { message: "Tuổi Bạn Nhập Phải Là Số " })
    age: number
    @IsNumber()
    phone: number
}
export class CreateUserDto {
    @IsNotEmpty()
    username: string
    @IsEmail()
    @IsNotEmpty({ message: "Email Không Được Để Trống" })
    email: string
    @IsNotEmpty()
    role: string
    @IsString()
    @IsNotEmpty({ message: "Mật Khẩu Không Được Để Trống" })
    password: string
    @ValidateNested()
    @Type(() => Profile)
    profile: Profile

}
export class RegisterUserDto {

    @IsNotEmpty({ message: 'Name không được để trống', })
    username: string;

    @IsEmail({}, { message: 'Email không đúng định dạng', })
    @IsNotEmpty({ message: 'Email không được để trống', })
    email: string;

    @IsNotEmpty({ message: 'Password không được để trống', })
    password: string;

    @IsNotEmpty({ message: 'Age không được để trống', })
    age: number;

    @IsNotEmpty({ message: 'Gender không được để trống', })
    gender: string;

    @IsNotEmpty({ message: 'Address không được để trống', })
    address: string;
}
