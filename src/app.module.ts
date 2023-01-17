import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { BinhluanModule } from './binhluan/binhluan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    TaskModule,
    BinhluanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
