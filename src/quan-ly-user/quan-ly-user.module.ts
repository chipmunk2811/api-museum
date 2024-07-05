import { Module } from '@nestjs/common';
import { QuanLyUserService } from './quan-ly-user.service';
import { QuanLyUserController } from './quan-ly-user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/utils/strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [QuanLyUserController],
  providers: [QuanLyUserService,JwtStrategy]
})
export class QuanLyUserModule {}
