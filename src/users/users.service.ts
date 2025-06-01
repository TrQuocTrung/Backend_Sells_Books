import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    const { username, email, password, profile } = user;

    await this.checkExists('email', email);
    await this.checkExists('username', username);

    // Gán mặc định role là 'user'
    const userRole = await this.roleModel.findOne({ name: 'NORMAL_USER' });
    if (!userRole) {
      throw new Error('Role "user" không tồn tại');
    }
    try {
      const hashPassword = this.getHashPassword(password);

      const newRegister = await this.userModel.create({
        username,
        email,
        password: hashPassword,
        profile,
        role: userRole._id,
      });

      return newRegister;
    } catch (error) {
      throw new InternalServerErrorException('Đăng ký thất bại. Vui lòng thử lại.');
    }

  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    Object.keys(filter).forEach((key) => {
      const value = filter[key];

      if (key.includes('createdAt') && typeof value === 'object') {
        // Trường hợp createdAt>= và createdAt<=
        const newObj: any = {};
        if (value['$gte']) newObj['$gte'] = new Date(value['$gte']);
        if (value['$lte']) newObj['$lte'] = new Date(value['$lte']);
        filter[key] = newObj;
      } else if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        filter[key] = { $regex: value, $options: 'i' };
      }
    });
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const results = await this.userModel.find(filter)
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
      results //kết quả query
    }
  }

  async findOne(id: number) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return `not found user`;

    return await this.userModel.findOne({
      _id: id
    })
      .select("-password").populate('role', { name: 1 });
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    const { password, ...rest } = updateUserDto;
    const updated = await this.userModel.updateOne(
      { _id: id },
      {
        ...rest,
        ...(password ? { password: this.getHashPassword(password) } : {}),
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
    }).populate({
      path: "role",
      select: { name: 1 }
    });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  updateUserToken = async (refreshToken: string, _id: string) => {
    return await this.userModel.updateOne(
      { _id },
      { refreshToken }
    )
  }
  findUserByToken = async (refreshToken: string) => {
    return await this.userModel.findOne({ refreshToken })
      .populate({
        path: "role",
        select: { name: 1 }
      });
  }
}
