import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UseFilters, UploadedFile, ValidationPipe, BadRequestException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Public, ResponseMessage, User } from 'src/decotator/customize';
import { IUser } from 'src/users/user.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  @UseInterceptors(FileInterceptor('fileUpload'))
  @UseFilters(new HttpExceptionFilter())
  async create(@Body(new ValidationPipe({ whitelist: true, transform: true }))
  createBookDto: CreateBookDto,
    @User() user: IUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageFileName = file?.filename ?? null;
    const createdBook = await this.booksService.create(createBookDto, user, imageFileName);
    return createdBook;
  }
  // books.controller.ts //Upload image for book
  @Post(':bookId/upload-image')
  @UseInterceptors(FileInterceptor('fileUpload'))
  async uploadBookImage(
    @Param('bookId') bookId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      console.log('File object:', file);
      throw new BadRequestException('No file uploaded');
    }
    console.log('Uploaded file:', file);
    const updatedBook = await this.booksService.updateBookImage(bookId, file.filename);
    return updatedBook;
  }
  @Public()
  @Get()
  @ResponseMessage("Get all books")
  findAll(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: Record<string, any>) {
    return this.booksService.findAll(+currentPage, +limit, qs);
  }
  @Public()
  @Get(':id')
  @ResponseMessage("Get book by id")
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @User() user: IUser, @UploadedFile() file: Express.Multer.File) {
    return this.booksService.update(id, updateBookDto, user, file?.filename);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.booksService.remove(id, user);
  }
}
