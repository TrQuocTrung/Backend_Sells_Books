import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { IUser } from './user.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { Role, RoleDocument } from 'src/role/schemas/role.schema';
import { USER_ROLE } from 'src/databases/sampleData';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>

  ) { }

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
  async register(user: RegisterUserDto) {
    const { username, email, password, age, gender, address } = user;
    await this.checkExists('email', email);
    await this.checkExists('username', username);

    //fetch user role
    //const userRole = await this.roleModel.findOne({ name: USER_ROLE });

    const hashPassword = this.getHashPassword(password);
    let newRegister = await this.userModel.create({
      username, email,
      password: hashPassword,
      age,
      gender,
      address,
      role: "User"
    })
    return newRegister;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const result = await this.userModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .select('-password')
      .populate(population)
      .exec();


    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages,  //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  }

  async findOne(id: number) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return `not found user`;

    return await this.userModel.findOne({
      _id: id
    })
      .select("-password");
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
