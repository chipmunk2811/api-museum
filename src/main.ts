import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets('.');

  const config = new DocumentBuilder().setTitle('DANH SÁCH API CHO MUSEUM').setDescription('Mô tả API')
  .setVersion('NGUYEN HOANG TRIEU')
  .addBearerAuth()
  .build();
  
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/', app, document);
await app.listen(process.env.SERVER_PORT,()=>console.log(`APP IS LISTENING TO http://localhost:${process.env.SERVER_PORT}/`));
}
bootstrap();
