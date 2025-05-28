import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto, IBookQueryResult } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'qs';
import { Category } from 'src/category/schemas/category.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: SoftDeleteModel<BookDocument>,
    @InjectModel(Category.name)
    private categoryModel: SoftDeleteModel<BookDocument>,
  ) { }
  private validatePrice(price: number) {
    if (price <= 0) {
      throw new BadRequestException('Giá sách phải lớn hơn 0');
    }
  }
  async create(createBookDto: CreateBookDto, user: IUser, imageFileName?: string) {
    const { name, author, stock, price, soldQuantity, categories, description } = createBookDto;
    this.validatePrice(createBookDto.price);
    // Đường dẫn file ảnh upload (bạn chỉnh lại cho đúng folder upload của bạn)

    const isExist = await this.bookModel.findOne({ name });
    if (isExist) {
      throw new BadRequestException(`Sách  với tên="${name}" đã tồn tại vui lòng nhập tên khác!`)
    }
    return await this.bookModel.create({
      name, author, stock, price, soldQuantity, categories, description, image: imageFileName ?? null,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
  }
  async updateBookImage(bookId: string, imageFileName: string) {
    // Kiểm tra book có tồn tại
    if (!imageFileName) {
      throw new BadRequestException('Image filename is missing');
    }
    const book = await this.bookModel.findById(bookId);
    if (!book) {
      // Xóa file ảnh đã upload vì book không tồn tại
      const filePath = path.join(process.cwd(), 'books', imageFileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new NotFoundException('Book not found');
    }
    return await this.bookModel.updateOne(
      { _id: bookId },
      { $set: { image: imageFileName, updatedAt: new Date() } }
    );
  }

  async findAll(currentPage: number, limit: number, qs: Record<string, any>): Promise<IBookQueryResult> {
    const { filter, sort } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    const categoryQuery = (qs.category as string) || '';
    delete filter.category;
    filter.isDeleted = false;
    try {
      // Nếu có truy vấn danh mục, tìm danh sách ID của các danh mục phù hợp
      if (categoryQuery) {
        const matchedCategories = await this.categoryModel
          .find({
            name: { $regex: categoryQuery, $options: 'i' },
            isDeleted: false, // Chỉ lấy danh mục chưa bị soft delete
          })
          .select('_id')
          .lean();
        const matchedCategoryIds = matchedCategories.map((c) => c._id);
        console.log('matchedCategoryIds:', matchedCategoryIds);
        if (matchedCategoryIds.length === 0) {
          return {
            meta: {
              current: currentPage,
              pageSize: limit,
              pages: 0,
              total: 0,
            },
            result: [],
          };
        }
        filter.categories = { $in: matchedCategoryIds };
      }

      const offset = (currentPage - 1) * limit;
      const defaultLimit = limit || 10;

      const totalItems = await this.bookModel.countDocuments(filter);
      const totalPages = Math.ceil(totalItems / defaultLimit);

      const result = await this.bookModel
        .find(filter)
        .skip(offset)
        .limit(defaultLimit)
        .sort(sort as any)
        .populate({ path: 'categories', select: '_id name', match: { isDeleted: false } })
        .lean()
        .exec();

      // Chuyển đổi _id thành chuỗi
      const formattedResult = result.map((book) => ({
        ...book,
        _id: book._id.toString(),
        categories: book.categories.map((cat: any) => ({
          ...cat,
          _id: cat._id.toString(),
        })),
      }));


      return {
        meta: {
          current: currentPage,
          pageSize: limit,
          pages: totalPages,
          total: totalItems,
        },
        result: formattedResult,
      };
    } catch (error) {
      throw new BadRequestException(`Lỗi khi truy vấn sách: ${error.message}`);
    }
  }
  async findOne(id: string) {
    return await this.bookModel.findById(id).populate({ path: 'categories', select: '_id name' })
  }
  async update(id: string, updateBookDto: UpdateBookDto, user: IUser, imageFileName?: string) {
    if (updateBookDto.price !== undefined) {
      this.validatePrice(updateBookDto.price);
    }
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const updated = await this.bookModel.updateOne(
      { _id: id },
      {
        ...updateBookDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      },
      { new: true }
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
