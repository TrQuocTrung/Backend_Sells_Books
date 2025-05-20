import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/view'));
  const configService = app.get(ConfigService);
  //Config Get Port .env
  const port = configService.get<number>('PORT');

  const reflector = app.get(Reflector);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,  // Bắt buộc phải có
  }));
  await app.listen(configService.get<number>('PORT')!, () => {
    console.log(`App is running at the : http://localhost:${port}`);
  });

}
bootstrap();
