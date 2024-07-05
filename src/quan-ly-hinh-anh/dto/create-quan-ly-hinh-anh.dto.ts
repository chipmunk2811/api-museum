import { ApiProperty } from "@nestjs/swagger";

export class CreateQuanLyHinhAnhDto {
    @ApiProperty({ required: true, type: String, format: 'binary' })
    file: Express.Multer.File
    @ApiProperty({ type: String, required: false, example: 'width height big small' })
    kichthuoc: string
    @ApiProperty({ required: false })
    vitri: number
    @ApiProperty({ type: String, required: false })
    noidung: string
    @ApiProperty({ type: String, required: false })
    mota: string
    @ApiProperty({ type: String, required: false })
    page: string
    @ApiProperty({ type: String, required: false })
    loai: string
    @ApiProperty({ type: String, required: false })
    manhinh: string
}

export class PageScreen{
    @ApiProperty({ type: String, required: true })
    page: string
    @ApiProperty({ type: String, required: true })
    manhinh: string
}


