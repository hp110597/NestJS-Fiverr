import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { BinhluanModule } from './binhluan/binhluan.module';
import { NguoidungModule } from './nguoidung/nguoidung.module';
import { LoaicongviecModule } from './loaicongviec/loaicongviec.module';
import { ThuecongviecModule } from './thuecongviec/thuecongviec.module';
import { ChitietloaicongviecModule } from './chitietloaicongviec/chitietloaicongviec.module';
import { CongviecModule } from './congviec/congviec.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    TaskModule,
    BinhluanModule,
    NguoidungModule,
    LoaicongviecModule,
    ThuecongviecModule,
    ChitietloaicongviecModule,
    CongviecModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
