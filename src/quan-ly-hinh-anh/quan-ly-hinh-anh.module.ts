import { Module } from '@nestjs/common';
import { QuanLyHinhAnhService } from './quan-ly-hinh-anh.service';
import { QuanLyHinhAnhController } from './quan-ly-hinh-anh.controller';

@Module({
  controllers: [QuanLyHinhAnhController],
  providers: [QuanLyHinhAnhService]
})
export class QuanLyHinhAnhModule {}
