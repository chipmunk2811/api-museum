import { PartialType } from '@nestjs/swagger';
import { CreateQuanLyUserDto } from './create-quan-ly-user.dto';

export class UpdateQuanLyUserDto extends PartialType(CreateQuanLyUserDto) {}
