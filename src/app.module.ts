import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module';
import { DatabasesModule } from './databases/databases.module';
import { BooksModule } from './books/books.module';
import { FilesModule } from './files/files.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    //Config .env
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        // connectionFactory: (connection) => {
        //   connection.plugin(softDeletePlugin)
        // }
      }),
      inject: [ConfigService],

    }),
    UsersModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    DatabasesModule,
    BooksModule,
    FilesModule,
    CategoryModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
