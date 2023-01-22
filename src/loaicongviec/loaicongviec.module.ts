import { Module } from '@nestjs/common';
import { LoaicongviecController } from './loaicongviec.controller';
import { LoaicongviecService } from './loaicongviec.service';

@Module({
  controllers: [LoaicongviecController],
  providers: [LoaicongviecService]
})
export class LoaicongviecModule {}
