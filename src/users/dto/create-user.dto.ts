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

    @IsNotEmpty()
    username: string
    @IsEmail()
    @IsNotEmpty({ message: "Email Không Được Để Trống" })
    email: string
    // @IsNotEmpty()
    // role: string
    @IsString()
    @IsNotEmpty({ message: "Mật Khẩu Không Được Để Trống" })
    password: string
    @ValidateNested()
    @Type(() => Profile)
    profile: Profile
}
