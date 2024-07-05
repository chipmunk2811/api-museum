import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuanLyUserService } from './quan-ly-user.service';
import { CreateQuanLyUserDto } from './dto/create-quan-ly-user.dto';
import { UpdateQuanLyUserDto } from './dto/update-quan-ly-user.dto';
import {  ApiTags } from '@nestjs/swagger';

@ApiTags('Quản Lý Tài Khoản')
@Controller('quan-ly-user')
export class QuanLyUserController {
  constructor(private readonly quanLyUserService: QuanLyUserService) {}

  @Post('/dangky')
  create(@Body() createQuanLyUserDto: CreateQuanLyUserDto) {
    try {
      return this.quanLyUserService.create(createQuanLyUserDto);
    } catch (error) {
      return error
    }
  
  }

  @Post('/dangnhap')
  login(@Body() createQuanLyUserDto: CreateQuanLyUserDto){
    try {
      return this.quanLyUserService.login(createQuanLyUserDto);
    } catch (error) {
      return error
    }
  }
 

}
