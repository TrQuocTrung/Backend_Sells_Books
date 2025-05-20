import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { IUser } from './user.interface';
import mongoose from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>) { }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }
  async checkExists(field: 'email' | 'username', value: string) {
    const user = await this.userModel.findOne({ [field]: value });
    if (user) {
      throw new BadRequestException(`${field === 'email' ? 'Email' : 'Username'}: ${value} đã tồn tại trên hệ thống. Vui lòng sử dụng ${field} khác.`);
    }
  }
  async create(createUserDto: CreateUserDto) {
    const { username, email, password, ...rest }
      = createUserDto;
    await this.checkExists('email', email);
    await this.checkExists('username', username);
    let hasspassword = await this.getHashPassword(password)
    let result = await this.userModel.create({
      username, email, password: hasspassword, ...rest
    })
    return result;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    const updated = await this.userModel.updateOne(
      { _id: id },
      {
        ...updateUserDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      });
    return updated;
  }


  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return `not found user`;

    const foundUser = await this.userModel.findById(id);
    if (foundUser && foundUser.email === "admin@gmail.com") {
      throw new BadRequestException("Không thể xóa tài khoản admin@gmail.com");
    }

    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      })
    return this.userModel.softDelete({
      _id: id
    })
  }

  findOneByUsername(identifier: string) {
    return this.userModel.findOne({
      $or: [{ username: identifier }, { email: identifier }]
    });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
}
