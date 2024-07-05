import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuanLyHinhAnhModule } from './quan-ly-hinh-anh/quan-ly-hinh-anh.module';
import { QuanLyUserModule } from './quan-ly-user/quan-ly-user.module';

@Module({
  imports: [QuanLyHinhAnhModule, QuanLyUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
