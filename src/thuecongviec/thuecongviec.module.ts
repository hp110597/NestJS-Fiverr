import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { ThuecongviecController } from './thuecongviec.controller';
import { ThuecongviecService } from './thuecongviec.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [ThuecongviecController],
  providers: [ThuecongviecService,JwtStrategy]
})
export class ThuecongviecModule {}
