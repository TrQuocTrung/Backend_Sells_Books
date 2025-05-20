import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/view'));
  const configService = app.get(ConfigService);
  //Config Get Port .env
  const port = configService.get<number>('PORT');
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI'),
      // connectionFactory: (connection) => {
      //   connection.plugin(softDeletePlugin)
      // }
    }),
    inject: [ConfigService],

  })
  await app.listen(configService.get<number>('PORT')!, () => {
    console.log(`App is running at the : http://localhost:${port}`);
  });

}
bootstrap();
