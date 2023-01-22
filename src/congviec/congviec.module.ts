import { Module } from '@nestjs/common';
import { CongviecController } from './congviec.controller';
import { CongviecService } from './congviec.service';

@Module({
  controllers: [CongviecController],
  providers: [CongviecService]
})
export class CongviecModule {}
