import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, UploadedFiles } from '@nestjs/common';
import { QuanLyHinhAnhService } from './quan-ly-hinh-anh.service';
import { CreateQuanLyHinhAnhDto, PageScreen } from './dto/create-quan-ly-hinh-anh.dto';
import { UpdateQuanLyHinhAnhDto } from './dto/update-quan-ly-hinh-anh.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const storageConfig = {
  storage: diskStorage({
    destination: process.cwd() + '/uploads/imgs',
    filename: (req, file, callback) => callback(null, Date.now() + '_' + file.originalname),
  }),
};

@ApiTags('Quản Lý Hình Ảnh')
@Controller('quan-ly-hinh-anh')
export class QuanLyHinhAnhController {
  constructor(private readonly quanLyHinhAnhService: QuanLyHinhAnhService) { }


  @UseInterceptors(FileInterceptor('file', storageConfig))
  @ApiConsumes('multipart/form-data')
  @Post()
  create(@Body() createQuanLyHinhAnhDto: CreateQuanLyHinhAnhDto, @UploadedFile() file: Express.Multer.File) {
    return this.quanLyHinhAnhService.create(createQuanLyHinhAnhDto, file);
  }

  @UseInterceptors(FilesInterceptor('files', 10, storageConfig))
  @ApiConsumes('multipart/form-data')
  @Post('createMany')
  createMany(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.quanLyHinhAnhService.createMany(files);
  }


  @Get()
  findAll() {
    return this.quanLyHinhAnhService.findAll();
  }

  @Get(':id')
  getDetail(@Param('id') id: string) {
    return this.quanLyHinhAnhService.getDetail(id);
  }

  @Post('pagescreen')
  getImgForPageAndScreen(@Query() query: PageScreen) {
    return this.quanLyHinhAnhService.getImgForPageAndScreen(query);
  }

  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuanLyHinhAnhDto: UpdateQuanLyHinhAnhDto, @UploadedFile() file: Express.Multer.File) {
    return this.quanLyHinhAnhService.update(id, updateQuanLyHinhAnhDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quanLyHinhAnhService.remove(id);
  }
}
