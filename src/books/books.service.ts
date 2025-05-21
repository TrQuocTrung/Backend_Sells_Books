import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: SoftDeleteModel<BookDocument>,
  ) { }
  private validatePrice(price: number) {
    if (price <= 0) {
      throw new BadRequestException('Giá sách phải lớn hơn 0');
    }
  }
  async create(createBookDto: CreateBookDto, user: IUser) {
    const { name, author, stock, price, soldQuantity, categories, description } = createBookDto;
    this.validatePrice(createBookDto.price);
    const isExist = await this.bookModel.findOne({ name });
    if (isExist) {
      throw new BadRequestException(`Sách  với tên="${name}" đã tồn tại vui lòng nhập tên khác!`)
    }
    return await this.bookModel.create({
      name, author, stock, price, soldQuantity, categories, description,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.bookModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const result = await this.bookModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
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

  async findOne(id: string) {
    return await this.bookModel.findById(id)
  }

  async update(id: string, updateBookDto: UpdateBookDto, user: IUser) {
    if (updateBookDto.price !== undefined) {
      this.validatePrice(updateBookDto.price);
    }

    const updated = await this.bookModel.updateOne(
      { _id: id },
      {
        ...updateBookDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      }
    );

    return updated;
  }

  async remove(id: string, user: IUser) {
    await this.bookModel.updateOne({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return this.bookModel.softDelete({ _id: id })
  }
}
