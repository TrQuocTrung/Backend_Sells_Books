import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/decotator/customize';
import { IUser } from 'src/users/user.interface';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }
  //Tạo Review Cho từng sách
  @Post('book/:bookId')
  createReviewForBook(
    @Param('bookId') bookId: string,
    @Body() dto: CreateReviewDto,
    @User() user: IUser,
  ) {
    return this.reviewService.createReviewForBook(bookId, dto, user);
  }
  @Get()
  findAll(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.reviewService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }
  @Get('book/:bookId')
  getReviewsByBook(@Param('bookId') bookId: string) {
    return this.reviewService.findReviewsByBook(bookId);
  }
  //Update Review cho user và admin 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto, @User() user: IUser) {
    return this.reviewService.update(id, updateReviewDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.reviewService.remove(id, user);
  }
}
