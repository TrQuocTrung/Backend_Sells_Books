import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: SoftDeleteModel<CategoryDocument>) { }
  async create(createCategoryDto: CreateCategoryDto, user: IUser) {
    const { name } = createCategoryDto;
    const isExist = await this.categoryModel.findOne({ name });
    if (isExist) {
      throw new BadRequestException(`Category với name=${name} đã tồn tại`)
    }
    return this.categoryModel.create({
      name, createdBy: {
        _id: user._id,
        email: user.email
      }
    })
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.categoryModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const results = await this.categoryModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate({ path: 'books' })
      .select(projection as any)
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

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid category ID");
    }
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(_id: string, updateCategoryDto: UpdateCategoryDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException("not found permission")
    }
    const name = updateCategoryDto;
    const updated = await this.categoryModel.updateOne(
      { _id },
      {
        name,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      });
    return updated;
  }

  async remove(id: string, user: IUser) {
    await this.categoryModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      })
    return this.categoryModel.softDelete({
      _id: id
    })
  }
}
