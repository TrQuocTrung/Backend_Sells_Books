import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import mongoose, { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';

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
  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
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
