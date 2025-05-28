import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { Book, BookSchema } from 'src/books/schemas/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }, { name: Book.name, schema: BookSchema }])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule { }
