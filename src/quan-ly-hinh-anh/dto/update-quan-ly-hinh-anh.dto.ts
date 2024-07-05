import { PartialType } from '@nestjs/swagger';
import { CreateQuanLyHinhAnhDto } from './create-quan-ly-hinh-anh.dto';

export class UpdateQuanLyHinhAnhDto extends PartialType(CreateQuanLyHinhAnhDto) {}
