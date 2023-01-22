import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { NguoidungController } from './nguoidung.controller';
import { NguoidungService } from './nguoidung.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [NguoidungController],
  providers: [NguoidungService,JwtStrategy]
})
export class NguoidungModule {}
