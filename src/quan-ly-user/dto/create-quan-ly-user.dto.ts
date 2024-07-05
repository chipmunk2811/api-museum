import { ApiProperty } from "@nestjs/swagger";
export class CreateQuanLyUserDto {
    @ApiProperty({ type: String, required: true })
    tk: string
    @ApiProperty({ type: String, required: true })
    password: string
    @ApiProperty({ type: String, required: false })
    token: string
}
