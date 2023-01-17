import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { BinhluanController } from './binhluan.controller';
import { BinhluanService } from './binhluan.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [BinhluanController],
  providers: [BinhluanService,JwtStrategy]
})
export class BinhluanModule {}
