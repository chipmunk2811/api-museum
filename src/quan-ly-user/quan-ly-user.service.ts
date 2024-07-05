import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateQuanLyUserDto } from './dto/create-quan-ly-user.dto';
import { UpdateQuanLyUserDto } from './dto/update-quan-ly-user.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Response, typesResponse } from 'src/utils/response';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class QuanLyUserService {
  constructor(private jwtService: JwtService) { }
  async create(createQuanLyUserDto: CreateQuanLyUserDto) {
    try {
      let { tk, password } = createQuanLyUserDto;
      const checkTK = await prisma.users.findFirst({ where: { tk } });
      if (!checkTK) {
        password = await bcrypt.hashSync(password, 10);
        const newData = { tk, password, token: createQuanLyUserDto.token }
        await prisma.users.create({ data: newData });
        const result = new Response(200, "Đăng Ký Thành Công", newData);
        return result;
      } else {
        throw new HttpException('Mã Tài Khoản Đã Tồn Tại', HttpStatus.BAD_REQUEST);
      }

    } catch (error) {
      const result = new Response(500, error.message, null);
      return result;
    }

  }


  async login(createQuanLyUserDto: CreateQuanLyUserDto) {
    try {
      const { tk, password } = createQuanLyUserDto;
      const checkTK = await prisma.users.findFirst({ where: { tk } });
      if (checkTK) {
        const checkMatKhau = await bcrypt.compareSync(password, checkTK.password);
        if (checkMatKhau) {
          const token = await this.jwtService.signAsync({ data: checkTK }, { expiresIn: "1d", secret: process.env.SECRET_KEY });
          const result={token}
          const res = new Response(202, 'Đăng Nhập Thành Công', result);
          return res;
        } else {
          throw new HttpException('Mật Khẩu Không Chính Xác', HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException('Mã Tài Khoản Không Tồn Tại', HttpStatus.NOT_FOUND);
      }

    } catch (error) {
      const result = new Response(500, error.message, null);
      return result;
    }
  }

}
