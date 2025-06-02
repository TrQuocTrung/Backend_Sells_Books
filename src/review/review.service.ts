import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import mongoose, { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: SoftDeleteModel<ReviewDocument>
  ) { }
  create(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
  }
  async createReviewForBook(bookId: string, dto: CreateReviewDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      throw new NotFoundException('Book không hợp lệ');
    }
    const existed = await this.reviewModel.findOne({
      user: user._id,
      book: bookId,
      isDeleted: { $ne: true }
    });

    if (existed) {
      throw new BadRequestException('Bạn đã đánh giá sách này rồi');
    }
    const review = new this.reviewModel({
      user: user._id,
      book: new Types.ObjectId(bookId),
      rating: dto.rating,
      comment: dto.comment,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });

    return await review.save();
  }
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.reviewModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const results = await this.reviewModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate({ path: "book", select: 'name' })
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
    if (!mongoose.Types.ObjectId.isValid(id))
      return `not found review`;

    return await this.reviewModel.findOne({ _id: id })
  }
  async findReviewsByBook(bookId: string) {
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      throw new BadRequestException('BookId không hợp lệ');
    }

    return await this.reviewModel
      .find({ book: bookId, isDeleted: { $ne: true } })
      .populate('user', 'email') // nếu bạn muốn hiện email người đánh giá
      .sort({ createdAt: -1 }) // mới nhất lên trước
      .exec();
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, user: IUser) {
    const review = await this.reviewModel.findById(id);
    if (!review || review.isDeleted) throw new NotFoundException('Không tìm thấy review');

    if (!review.user.equals(user._id) && user.role.name !== 'SUPER_ADMIN') {
      throw new ForbiddenException('Bạn không có quyền sửa review này');
    }

    review.rating = updateReviewDto.rating ?? review.rating;
    review.comment = updateReviewDto.comment ?? review.comment;
    review.updatedBy = {
      _id: new Types.ObjectId(user._id),
      email: user.email
    };

    return await review.save();
  }

  async remove(id: string, user: IUser) {
    const review = await this.reviewModel.findById(id);
    if (!review || review.isDeleted) {
      throw new NotFoundException('Review không tồn tại hoặc đã bị xóa');
    }

    // Kiểm tra quyền admin
    if (user.role.name !== 'SUPER_ADMIN') {
      throw new ForbiddenException('Bạn không có quyền xóa review');
    }

    review.deletedBy = {
      _id: new Types.ObjectId(user._id),
      email: user.email,
    };
    review.deletedAt = new Date();

    await review.save(); // lưu lại deletedBy, deletedAt

    // Thực hiện soft delete bằng plugin
    await this.reviewModel.softDelete({ _id: review._id });
  }
}
