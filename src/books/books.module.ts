import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/files/multer.config';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  MulterModule.registerAsync({
    useClass: MulterConfigService,
  }),],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [
    MongooseModule
  ]
})
export class BooksModule { }
