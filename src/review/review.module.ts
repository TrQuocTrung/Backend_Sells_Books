import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/review.schema';
import { Book, BookSchema } from 'src/books/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }, { name: Book.name, schema: BookSchema }]) // đăng ký schema
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule { }
