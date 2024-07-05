import { Injectable } from '@nestjs/common';
import { CreateQuanLyHinhAnhDto } from './dto/create-quan-ly-hinh-anh.dto';
import { UpdateQuanLyHinhAnhDto } from './dto/update-quan-ly-hinh-anh.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Response, typesResponse } from 'src/utils/response';
import * as fs from 'fs';

@Injectable()
export class QuanLyHinhAnhService {
  async create(createQuanLyHinhAnhDto: CreateQuanLyHinhAnhDto, file) {
    try {
      const base64: string = await new Promise((resolve, reject) => {
        fs.readFile(process.cwd() + "/uploads/imgs/" + file.filename, (err, img) => {
          if (err) throw err;
          const base64String = `data:${file.mimetype};base64,${Buffer.from(img).toString("base64")}`;
          fs.unlinkSync(process.cwd() + "/uploads/imgs/" + file.filename);
          resolve(base64String);
        });
      });

      const newData = { vitri: Number(createQuanLyHinhAnhDto.vitri), urlImg: base64, kichthuoc: createQuanLyHinhAnhDto.kichthuoc, noidung: createQuanLyHinhAnhDto.noidung, mota: createQuanLyHinhAnhDto.mota, page: createQuanLyHinhAnhDto.page, loai: createQuanLyHinhAnhDto.loai, manhinh: createQuanLyHinhAnhDto.manhinh }
      const data = await prisma.images.create({ data: newData })

      const result = new Response(200, 'Oke', data);
      return result;
    } catch (error) {
      const result = new Response(500, error.message, null);
      return result;
    }
  }

  async createMany(files) {
    try {
      let data=[]
      if (Array.isArray(files)) files.map(async (file) => {
        const base64: string = await new Promise((resolve, reject) => {
          fs.readFile(process.cwd() + "/uploads/imgs/" + file.filename, (err, img) => {
            if (err) throw err;
            const base64String = `data:${file.mimetype};base64,${Buffer.from(img).toString("base64")}`;
            fs.unlinkSync(process.cwd() + "/uploads/imgs/" + file.filename);
            resolve(base64String);
          });
        });
        await prisma.images.create({ data: { urlImg: base64 } });
        data=[...data,{urlImg:base64}]
      })
      const result = new Response(200, 'Oke', data);
      return result;
    } catch (error) {
      const result = new Response(500, error.message, null);
      return result;
    }
  }


  async findAll() {
    try {
      const data = await prisma.images.findMany();
      const result = new Response(200, 'Oke', data);
      return result;
    } catch (error) {
      const result = new Response(500, error.message, null);
      return result;
    }
  }

  async getDetail(id) {
    try {
      const data = await prisma.images.findFirst({ where: { id } });
      const result = new Response(200, 'Oke', data);
      return result;
    } catch (error) {
      const result = new Response(500, error.message, null);
      return result;
    }
  }

  async getImgForPageAndScreen(query) {
    try {
      const { page, manhinh } = query
      const data = await prisma.images.findMany({ where: { page, manhinh } });
      const result = new Response(200, 'Oke', data);
      return result;
    } catch (error) {
      const result = new Response(500, error.message, null);
      return result;
    }
  }

  async update(id: string, updateQuanLyHinhAnhDto: UpdateQuanLyHinhAnhDto, file: Express.Multer.File) {

    try {
      let data = {};
      if (file) {
        const base64: string = await new Promise((resolve, reject) => {
          fs.readFile(process.cwd() + "/uploads/imgs/" + file.filename, (err, img) => {
            if (err) throw err;
            const base64String = `data:${file.mimetype};base64,${Buffer.from(img).toString("base64")}`;
            fs.unlinkSync(process.cwd() + "/uploads/imgs/" + file.filename);
            resolve(base64String);
          });
        });
        data = { ...data, urlImg: base64 };
      }
      if (updateQuanLyHinhAnhDto.vitri) { data = { ...data, vitri: Number(updateQuanLyHinhAnhDto.vitri) }; }
      if (updateQuanLyHinhAnhDto.page) { data = { ...data, page: updateQuanLyHinhAnhDto.page }; }
      if (updateQuanLyHinhAnhDto.noidung) { data = { ...data, noidung: updateQuanLyHinhAnhDto.noidung }; }
      if (updateQuanLyHinhAnhDto.mota) {
        data = { ...data, mota: updateQuanLyHinhAnhDto.mota };
      }
      if (updateQuanLyHinhAnhDto.loai) {
        data = { ...data, loai: updateQuanLyHinhAnhDto.loai };
      }
      if (updateQuanLyHinhAnhDto.kichthuoc) {
        data = { ...data, kichthuoc: updateQuanLyHinhAnhDto.kichthuoc };
      }
      if (updateQuanLyHinhAnhDto.manhinh) {
        data = { ...data, manhinh: updateQuanLyHinhAnhDto.manhinh };
      }
      const newData = await prisma.images.update({ where: { id }, data: data });
      const result = new Response(200, 'Oke', newData);
      return result;
    } catch (error) {
      const result = new Response(500, error.message, null);
      return result;
    }
  }

  async remove(id: string) {
    try {
      const data = await prisma.images.delete({ where: { id } })
      const result = new Response(200, 'Oke', data);
      return result;
    } catch (error) {
      const result = new Response(500, error.message, null);
      return result;
    }

  }
}
