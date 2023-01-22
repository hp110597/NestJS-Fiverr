import { Module } from '@nestjs/common';
import { ChitietloaicongviecController } from './chitietloaicongviec.controller';
import { ChitietloaicongviecService } from './chitietloaicongviec.service';

@Module({
  controllers: [ChitietloaicongviecController],
  providers: [ChitietloaicongviecService]
})
export class ChitietloaicongviecModule {}
