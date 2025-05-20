import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
